import {auth, auth_backend, frontend} from "./firebase-config.js";
import {signInWithCustomToken, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


export function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + "=")) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

export function setCookie(name, value, maxAge=60) {
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

export async function fetchRole() {
  const token = await auth.currentUser.getIdTokenResult();
  const role = token.claims.role;
  console.log("[auth] role =>", role)
  return role
}

export async function consumeAccessToken(secureEndpoint) {
  const accessToken = getCookie("_fp_cameroon_accessToken");
  console.log("[auth] accessToken =>", !!accessToken)
  if (accessToken) {
    const user = await signInWithCustomToken(auth, accessToken);
    console.log("[auth] users =>", !!user, !!auth.currentUser)
    const role = await fetchRole(user);
    if (role === "admin") {
      console.log("[auth] redirecting => dashboard");
      return true;
    }
  }
  return false;
}

async function fetchAccessToken(secureEndpoint="dashboard.html") {
  console.log("Calling auth backend...:");
  await discardCookie("_fp_cameroon_redirect");
  setCookie("_fp_cameroon_redirect", `${frontend}/${secureEndpoint}`)
  setCookie("_fp_cameroon_role", `admin`)
  window.location.replace( `${auth_backend}`)
}

async function discardCookie(name) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

export async function login(secureEndpoint="dashboard.html") {
  try {
    await consumeAccessToken(secureEndpoint) ||  (await fetchAccessToken(secureEndpoint))
  } catch (e) {
    console.log(e);
  }
}

export async function logout(){
  await discardCookie("_fp_cameroon_accessToken");
  await discardCookie("_fp_cameroon_uid");
  await discardCookie("_fp_cameroon_role");
  await discardCookie("_fp_cameroon_redirect");
  window.location.href="/"
}

export {auth, onAuthStateChanged};


