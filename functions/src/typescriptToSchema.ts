import * as functions from "firebase-functions";
import * as ts from "typescript";
import { createGenerator } from "ts-json-schema-generator";
import * as fs from "fs";

function createSource(
  code: string,
  file: string = `${Math.random()}.ts`
): ts.SourceFile {
  return ts.createSourceFile(
    file,
    code,
    ts.ScriptTarget.ES2015,
    true,
    ts.ScriptKind.TS
  );
}

function getTypeDefIdentifiers(sourceFile: ts.SourceFile): ts.Identifier[] {
  function getIdsFromNode(n: ts.Node | ts.SourceFile): ts.Identifier[] {
    const ids: ts.Identifier[] = [];
    n.getChildren().forEach(n => {
      if (
        n.kind === ts.SyntaxKind.InterfaceDeclaration ||
        n.kind === ts.SyntaxKind.EnumDeclaration ||
        n.kind === ts.SyntaxKind.TypeAliasDeclaration
      ) {
        ids.push(
          n.getChildren().find(n => ts.isIdentifier(n)) as ts.Identifier
        );
      } else {
        ids.push(...getIdsFromNode(n));
      }
    });
    return ids;
  }
  return getIdsFromNode(sourceFile);
}

function generateSchema(sourceCode: string, idName: string) {
  const filename = `${Math.random()
    .toString()
    .replace(".", "")}.ts`;
  const prefix = "/tmp/schemaGeneration";
  if (!fs.existsSync(prefix)) {
    fs.mkdirSync(prefix);
  }
  fs.writeFileSync(
    prefix + "/tsconfig.json",
    JSON.stringify({
      compilerOptions: {
        noEmit: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        target: "ES5",
        module: "CommonJS",
        strictNullChecks: false
      }
    }),
    { encoding: "utf-8" }
  );
  fs.writeFileSync(prefix + "/" + filename, sourceCode, { encoding: "utf-8" });
  createSource(sourceCode, filename);
  const schemaGenerator = createGenerator({
    tsconfig: prefix + "/tsconfig.json",
    expose: "export",
    topRef: true,
    jsDoc: "basic",
    sortProps: true,
    skipTypeCheck: true,
    type: idName
  });
  // return sourceCode;
  const schema = schemaGenerator.createSchema(idName);
  return JSON.stringify(schema, null, 4);
  // return fs.readFileSync("/tmp/tsconfig.json");
}

export const schema = functions.https.onRequest(async (req, resp) => {
  resp.set("Access-Control-Allow-Origin", "*");
  if (req.method !== "POST") {
    resp.sendStatus(405);
    return;
  }
  const rootIdentifier = req.header("SchemaRootType");
  if (typeof rootIdentifier !== "string") {
    resp.sendStatus(400);
    return;
  }
  try {
    const sourceCode = req.rawBody.toString("utf-8");
    resp.send(generateSchema(sourceCode, rootIdentifier));
  } catch (e) {
    resp.status(500).send(e.message);
  }
});

export const identifiers = functions.https.onRequest(async (req, resp) => {
  resp.set("Access-Control-Allow-Origin", "*");
  if (req.method !== "POST") {
    resp.sendStatus(405);
    return;
  }
  const source = createSource(req.rawBody.toString("utf-8"));
  const ids = getTypeDefIdentifiers(source).map(i => i.escapedText.toString());
  resp.send(ids);
});
