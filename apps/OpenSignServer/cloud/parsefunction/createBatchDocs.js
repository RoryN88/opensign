import axios from 'axios';
import {
  cloudServerUrl,
  replaceMailVaribles,
} from '../../Utils.js';
const serverUrl = cloudServerUrl; //process.env.SERVER_URL;
const appId = process.env.APP_ID;
async function deductcount(
  docsCount,
  extUserId,
) {
  try {
    const extCls = new Parse.Object('contracts_Users');
    extCls.id = extUserId;
    extCls.increment('DocumentCount', docsCount);
    const resExt = await extCls.save(null, { useMasterKey: true });
  } catch (err) {
    console.log('Err in deduct in quick send', err);
  }
}
async function sendMail(document) {
  //sessionToken
  const baseUrl = new URL(process.env.PUBLIC_URL);

  // console.log("pdfDetails", pdfDetails);
  const timeToCompleteDays = document?.TimeToCompleteDays || 15;
  const ExpireDate = new Date(document.createdAt);
  ExpireDate.setDate(ExpireDate.getDate() + timeToCompleteDays);
  const newDate = ExpireDate;
  const localExpireDate = newDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const sender = document.ExtUserPtr.Email;
  let signerMail = document.Placeholders;

  if (document.SendinOrder) {
    signerMail = signerMail.slice();
    signerMail.splice(1);
  }
  for (let i = 0; i < signerMail.length; i++) {
    try {
      const imgPng = 'https://qikinnovation.ams3.digitaloceanspaces.com/logo.png';
      let url = `${serverUrl}/functions/sendmailv3`;
      const headers = { 'Content-Type': 'application/json', 'X-Parse-Application-Id': appId };
      const objectId = signerMail[i]?.signerObjId;
      const hostUrl = baseUrl.origin;
      let encodeBase64;
      let existSigner = {};
      if (objectId) {
        existSigner = document?.Signers?.find(user => user.objectId === objectId);
        encodeBase64 = btoa(`${document.objectId}/${existSigner?.Email}/${objectId}`);
      } else {
        encodeBase64 = btoa(`${document.objectId}/${signerMail[i].email}`);
      }
      let signPdf = `${hostUrl}/login/${encodeBase64}`;
      const openSignUrl = 'https://www.opensignlabs.com/';
      const orgName = document.ExtUserPtr.Company ? document.ExtUserPtr.Company : '';
      const themeBGcolor = '#47a3ad';
      const senderObj = document?.ExtUserPtr;
      const mailBody = document?.ExtUserPtr?.TenantId?.RequestBody || '';
      const mailSubject = document?.ExtUserPtr?.TenantId?.RequestSubject || '';
      let replaceVar;
      if (mailBody && mailSubject) {
        const replacedRequestBody = mailBody.replace(/"/g, "'");
        const htmlReqBody =
          "<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8' /></head><body>" +
          replacedRequestBody +
          '</body></html>';
        const variables = {
          document_title: document?.Name,
          sender_name:
            senderObj?.Name,
          sender_mail:
            senderObj?.Email,
          sender_phone: senderObj?.Phone || '',
          receiver_name: existSigner?.Name || '',
          receiver_email: existSigner?.Email || signerMail[i].email,
          receiver_phone: existSigner?.Phone || '',
          expiry_date: localExpireDate,
          company_name: orgName,
          signing_url: `<a href=${signPdf} target=_blank>Sign here</a>`,
        };
        replaceVar = replaceMailVaribles(mailSubject, htmlReqBody, variables);
      }

      let params = {
        extUserId: document.ExtUserPtr.objectId,
        recipient: objectId ? existSigner?.Email : signerMail[i].email,
        subject: replaceVar?.subject
          ? replaceVar?.subject
          : `${document.ExtUserPtr.Name} has requested you to sign "${document.Name}"`,
        from:
          sender,
        replyto:
          sender ||
          '',
        html: replaceVar?.body
          ? replaceVar?.body
          : "<html><head><meta http-equiv='Content-Type' content='text/html;charset=UTF-8' /></head><body><div style='background-color:#f5f5f5;padding:20px;'><div style='box-shadow:rgba(0, 0, 0, 0.1) 0px 4px 12px;background:white;padding-bottom:20px;'><div style='padding:10px 10px 0 10px'><img src=" +
            imgPng +
            " height='50' style='padding:20px;width:170px;height:40px;' /></div><div style='padding:2px;font-family:system-ui;background-color:" +
            themeBGcolor +
            ";'><p style='font-size:20px;font-weight:400;color:white;padding-left:20px;' > Digital Signature Request</p></div><div><p style='padding:20px;font-family:system-ui;font-size:14px;margin-bottom:10px;'> " +
            document.ExtUserPtr.Name +
            ' has requested you to review and sign <strong> ' +
            document.Name +
            "</strong>.</p><div style='padding: 5px 0px 5px 25px;display:flex;flex-direction:row;justify-content:space-around;'><table><tr><td style='font-weight:bold;font-family:sans-serif;font-size:15px'>Sender</td><td></td><td style='color:#626363;font-weight:bold'>" +
            sender +
            "</td></tr><tr><td style='font-weight:bold;font-family:sans-serif;font-size:15px'>Organization</td><td></td><td style='color:#626363;font-weight:bold'> " +
            orgName +
            "</td></tr><tr><td style='font-weight:bold;font-family:sans-serif;font-size:15px'>Expires on</td><td></td><td style='color:#626363;font-weight:bold'>" +
            localExpireDate +
            "</td></tr><tr><td></td><td></td></tr></table></div><div style='margin-left:70px;'><a target=_blank href=" +
            signPdf +
            "><button style='padding:12px 12px 12px 12px;background-color:#d46b0f;color:white;border:0px;box-shadow:rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;font-weight:bold;margin-top:30px;'>Sign here</button></a></div><div style='display:flex;justify-content:center;margin-top:10px;'></div></div></div><div><p> This is an automated email from OpenSign™. For any queries regarding this email, please contact the sender " +
            sender +
            ' directly.If you think this email is inappropriate or spam, you may file a complaint with OpenSign™ <a href=' +
            openSignUrl +
            ' target=_blank>here</a>.</p></div></div></body></html>',
      };
      const sendMail = await axios.post(url, params, { headers: headers });
      // if (sendMail.data.result.status === 'success') {
      //   console.log('batch login mail sent');
      // }
    } catch (error) {
      console.log('error', error);
    }
  }
}
async function batchQuery(
  userId,
  Documents,
  Ip,
  parseConfig,
  type
) {
  const extCls = new Parse.Query('contracts_Users');
  extCls.equalTo('UserId', {
    __type: 'Pointer',
    className: '_User',
    objectId: userId,
  });
  const resExt = await extCls.first({ useMasterKey: true });
  if (resExt) {
    const _resExt = JSON.parse(JSON.stringify(resExt));
    try {
      const requests = Documents.map(x => {
        const Signers = x.Signers;
        const allSigner = x?.Placeholders?.map(
          item => Signers?.find(e => item?.signerPtr?.objectId === e?.objectId) || item?.signerPtr
        ).filter(signer => Object.keys(signer).length > 0);
        const date = new Date();
        const isoDate = date.toISOString();
        let Acl = { [x.CreatedBy.objectId]: { read: true, write: true } };
        if (allSigner && allSigner.length > 0) {
          allSigner.forEach(x => {
            if (x?.CreatedBy?.objectId) {
              const obj = { [x.CreatedBy.objectId]: { read: true, write: true } };
              Acl = { ...Acl, ...obj };
            }
          });
        }
        const mailBody = x?.ExtUserPtr?.TenantId?.RequestBody || '';
        const mailSubject = x?.ExtUserPtr?.TenantId?.RequestSubject || '';
        return {
          method: 'POST',
          path: '/app/classes/contracts_Document',
          body: {
            Name: x.Name,
            URL: x.URL,
            Note: x.Note,
            Description: x.Description,
            CreatedBy: x.CreatedBy,
            SendinOrder: x.SendinOrder || true,
            ExtUserPtr: {
              __type: 'Pointer',
              className: x.ExtUserPtr.className,
              objectId: x.ExtUserPtr?.objectId,
            },
            Placeholders: x.Placeholders.map(y =>
              y?.signerPtr?.objectId
                ? {
                    ...y,
                    signerPtr: {
                      __type: 'Pointer',
                      className: 'contracts_Contactbook',
                      objectId: y.signerPtr.objectId,
                    },
                    signerObjId: y.signerObjId,
                    email: y?.signerPtr?.Email || y?.email || '',
                  }
                : { ...y, signerPtr: {}, signerObjId: '', email: y.email || '' }
            ),
            SignedUrl: x.URL || x.SignedUrl,
            SentToOthers: true,
            Signers: allSigner?.map(y => ({
              __type: 'Pointer',
              className: 'contracts_Contactbook',
              objectId: y.objectId,
            })),
            ACL: Acl,
            SentToOthers: true,
            RemindOnceInEvery: x.RemindOnceInEvery || 5,
            AutomaticReminders: x.AutomaticReminders || false,
            TimeToCompleteDays: x.TimeToCompleteDays || 15,
            OriginIp: Ip,
            DocSentAt: { __type: 'Date', iso: isoDate },
            IsEnableOTP: x?.IsEnableOTP || false,
            IsTourEnabled: x?.IsTourEnabled || false,
            AllowModifications: x?.AllowModifications || false,
            ...(x?.SignatureType ? { SignatureType: x?.SignatureType } : {}),
            ...(x?.NotifyOnSignatures ? { NotifyOnSignatures: x?.NotifyOnSignatures } : {}),
            ...(x?.Bcc?.length > 0 ? { Bcc: x?.Bcc } : {}),
            ...(x?.RedirectUrl ? { RedirectUrl: x?.RedirectUrl } : {}),
            ...(mailBody ? { RequestBody: mailBody } : {}),
            ...(mailSubject ? { RequestSubject: mailSubject } : {}),
          },
        };
      });
      // console.log('requests ', requests);
        if (requests?.length > 0) {
          const newrequests = [requests?.[0]];
          const response = await axios.post('batch', { requests: newrequests }, parseConfig);
          // Handle the batch query response
          // console.log('Batch query response:', response.data);
          if (response.data && response.data.length > 0) {
            const document = Documents?.[0];
            const updateDocuments = {
              ...document,
              objectId: response.data[0]?.success?.objectId,
              createdAt: response.data[0]?.success?.createdAt,
            };
            deductcount(response.data.length, resExt.id);
            sendMail(updateDocuments); //sessionToken
            return 'success';
          }
      }
    } catch (error) {
      const code = error?.response?.data?.code || error?.response?.status || error?.code || 400;
      const msg =
        error?.response?.data?.error ||
        error?.response?.data ||
        error?.message ||
        'Something went wrong.';
      console.log('Error performing batch query:', code, msg);
      throw new Parse.Error(code, msg);
    }
  } else {
    throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'User not found.');
  }
}
export default async function createBatchDocs(request) {
  const strDocuments = request.params.Documents;
  const sessionToken = request.headers?.sessiontoken;
  const type = request.headers?.type || 'quicksend';
  const Documents = JSON.parse(strDocuments);
  const Ip = request?.headers?.['x-real-ip'] || '';
  const parseConfig = {
    baseURL: serverUrl,
    headers: {
      'X-Parse-Application-Id': appId,
      'X-Parse-Session-Token': sessionToken,
      'Content-Type': 'application/json',
    },
  };
  try {
    if (request?.user) {
      return await batchQuery(request.user.id, Documents, Ip, parseConfig, '', type);
    }
    else {
      throw new Parse.Error(Parse.Error.INVALID_SESSION_TOKEN, 'User is not authenticated.');
    }
  } catch (err) {
    console.log('err in createbatchdoc', err);
    const code = err?.code || 400;
    const msg = err?.message || 'Something went wrong.';
    throw new Parse.Error(code, msg);
  }
}
