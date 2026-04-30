import { db } from "./firebase-config.js";
import { collection, getDocs, onSnapshot, query, getDoc, deleteDoc, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ordersRef = collection(db, "orders");
const catalogRef = collection(db, "catalog");

async function sendOrder(orderId) {
  alert(`Order ${orderId}: send not implemented yet`);
}

async function cancelOrder(orderId) {
  alert(`Order ${orderId}: cancel not implemented yet`);
}

async function loadOrders(db) {
  const orders = await getDocs(ordersRef);
  return orders.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function loadCatalog() {
  const snapshot = await getDocs(catalogRef);
  return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
}

function onDatabaseChanged(database="catalog") {
  const catalogRef = collection(db, database);
  return query(catalogRef);
}

async function deleteItem(id, title = "this item", database="catalog") {
  const confirmed = confirm(`[firestore] Delete "${title}" permanently?`);
  if (!confirmed) return;
  try {
    await deleteDoc(doc(db, database, id));
    alert("[firestore]  Item deleted successfully.");
  } catch (error) {
    console.error("Delete error:", error);
    alert("[firestore] Unable to delete item.");
  }
}

async function getItem(id, database="catalog") {
  try {
    return await getDoc(doc(db, database, id));
  } catch (error) {
    console.error("Get error:", error);
    alert("[firestore] Unable to get item.");
  }
}

async function putItem(id, data, database="catalog") {
  try {
    await setDoc(doc(db, database, id), data);
  } catch (error) {
    console.error("Put error:", error);
    alert("[firestore] Unable to put item.");
  }
}

async function updateItem(id, data, database="catalog") {
  try {
    await updateDoc(doc(db, database, id), data);
    alert("[firestore]  Item deleted successfully.");
  } catch (error) {
    console.error("Update error:", error);
    alert("[firestore]  Unable to delete item.");
  }
}

export { sendOrder, cancelOrder, loadOrders,
  loadCatalog, onDatabaseChanged, onSnapshot,
  deleteItem, doc, setDoc, updateDoc,
  getItem, putItem, updateItem}