import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

interface Value {
  source: string;
  schema: any;
  value: any;
}

export const values = functions.https.onRequest(async (req, resp) => {
  const id = req.path.slice(1);
  if (!id) {
    resp.sendStatus(400);
    return;
  }
  resp.set("Access-Control-Allow-Origin", "*");
  const ref = admin
    .firestore()
    .collection("values")
    .doc(id);
  if (req.method === "POST") {
    await ref.set(req.body);
    resp.sendStatus(204);
  } else {
    resp.send((await ref.get()).data());
  }
});

export const json = functions.https.onRequest(async (req, resp) => {
  const id = req.path.slice(1);
  if (!id) {
    resp.sendStatus(400);
    return;
  }
  resp.set("Access-Control-Allow-Origin", "*");
  const ref = admin
    .firestore()
    .collection("values")
    .doc(id);
  const snapshot = await ref.get();
  if (!snapshot.exists) {
    resp.sendStatus(404);
  } else {
    resp.send(snapshot.get("value" as keyof Value));
  }
});
