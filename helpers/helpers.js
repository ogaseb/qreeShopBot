import qrCode from 'qrcode-generator'

export function parseDropboxLink(link){
  let string = link;
  string = string.split("/");
  string[5] = '?dl=1';
  string = string.join("/")
  return string
}

export function parseGDriveLink(link){
  return link.replace(/\/file\/d\/(.+)\/(.+)/, "/uc?export=download&id=$1");
}

export function createASCIIQrCode(link){
  let qr = qrCode(0, 'M');
  qr.addData(`${link}`);
  qr.make();
  return qr.createASCII()
}

export const regexes = {
  DROPBOX: /\b(\w*dropbox\w*)\b/g,
  GDRIVE: /\b(\w*drive.google.com\w*)\b/g,
  URL: /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g,
  ARGUMENTS: /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?|\w+|"(?:\\"|[^"])+"|\'(?:\\'|[^'])+'|\S+/g
}
//(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?\w+|"(?:\\"|[^"])+"|'(?:\\'|[^"])+'|\w+
