import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import md5 = require("md5");

interface Value {
  source: string;
  schema: any;
  value: any;
}

const keySalt = "saltsaltsalt";

export const values = functions.https.onRequest(async (req, resp) => {
  const id = req.path.match(/([^\/]*)$/)?.[0];
  if (!id) {
    resp.sendStatus(400);
    return;
  }
  const key = md5(id + keySalt);
  const ref = admin
    .firestore()
    .collection("values")
    .doc(key);
  if (req.method === "POST") {
    await ref.set(req.body, { merge: true });
    resp.json({ retrieveKey: key });
  } else {
    resp.json((await ref.get()).data());
  }
});

export const json = functions.https.onRequest(async (req, resp) => {
  resp.set("Access-Control-Allow-Origin", "*");
  const key = req.path.match(/([^\/]*)$/)?.[0];
  if (!key) {
    resp.sendStatus(400);
    return;
  }
  const ref = admin
    .firestore()
    .collection("values")
    .doc(key);
  const snapshot = await ref.get();
  if (!snapshot.exists) {
    // resp.sendStatus(404);
    resp.send(req.path);
  } else {
    resp.setHeader("Access-Control-Allow-Headers", "*");
    resp.json(JSON.parse(snapshot.get("value" as keyof Value)));
  }
});
