npm install
  const functions = require('firebase-functions');
const admin = require('firebase-admin');
const language = require('@google-cloud/language');
admin.initializeApp();
const client = new language.LanguageServiceClient();

exports.onFileUpload = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const bucket = admin.storage().bucket(object.bucket);
  const file = bucket.file(filePath);
  const [buffer] = await file.download();
  const content = buffer.toString('utf8');
  const document = { content, type: 'PLAIN_TEXT' };
  const [result] = await client.analyzeEntities({ document });
  const keywords = result.entities.map(e => e.name);
  const docId = filePath.split('/')[0]; // folder per doc ID
  await admin.firestore().collection('submissions').doc(docId).set({ keywords }, { merge: true });
});
