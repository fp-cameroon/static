import {auth, auth_backend, frontend} from "./firebase-config.js";
import {signInWithCustomToken, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + "=")) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

function setCookie(name, value, maxAge=60) {
  const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  cookie += `; path=/`;
  cookie += `; max-age=${maxAge}`;
  if (!isLocal) {
    cookie += `; Domain=.fp-cameroon.com`;
    cookie += `; SameSite=None; Secure`;
  }
  document.cookie = cookie;
}

async function fetchRole() {
  const token = await auth.currentUser.getIdTokenResult();
  const role = token.claims.role;
  console.log("[auth] role =>", role)
  return role
}

async function consumeAccessToken(secureEndpoint) {
  const accessToken = getCookie("_fp_cameroon_accessToken");
  console.log("[auth] accessToken =>", !!accessToken)
  if (accessToken) {
    const user = await signInWithCustomToken(auth, accessToken);
    console.log("[auth] users =>", !!user, !!auth.currentUser)
    const role = await fetchRole(user);
    if (role === "admin") {
      console.log("[auth] redirecting =>", secureEndpoint);
      return true;
    }
  }
  return false;
}

async function fetchAccessToken(secureEndpoint="index.html", localServer, authServer) {
  console.log("Calling auth backend...:");
  await discardCookie("_fp_cameroon_redirect");
  setCookie("_fp_cameroon_redirect", `${localServer}/${secureEndpoint}`)
  setCookie("_fp_cameroon_role", `admin`)
  window.location.replace( `${authServer}`)
}

async function discardCookie(name) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

async function login(secureEndpoint="index.html", localServer=frontend, authServer=auth_backend) {
  try {
    await consumeAccessToken(secureEndpoint) ||  (await fetchAccessToken(secureEndpoint, localServer, authServer))
  } catch (e) {
    console.log(e);
  }
}

async function logout(){
  await discardCookie("_fp_cameroon_accessToken");
  await discardCookie("_fp_cameroon_uid");
  await discardCookie("_fp_cameroon_role");
  await discardCookie("_fp_cameroon_redirect");
  await signOut(auth);
  window.location.href="/"
}

export {auth, onAuthStateChanged, logout, login, consumeAccessToken, fetchRole, setCookie, getCookie};
