/*
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-03-23 10:36:09
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-24 17:36:05
 */
export const uploadType = (file: any) => {
  let $index = file?.fileName?.lastIndexOf(".");
  const type = file?.fileName?.substring($index + 1);
  switch (type) {
    case "gif":
    case "jpg":
    case "png":
    case "jpeg":
      return `/sales-api/sales-document-cover/file/browse/${file.fileId}`;
    case "doc":
    case "docx":
    case "docm":
      return require("../../../img/word.jpg");
    case "xls":
    case "xlsx":
      return require("../../../img/excel.png");
    case "pdf":
      return require("../../../img/pdf.jpg");
    case "ppt":
    case "potx":
    case "pptx":
      return require("../../../img/ppt.png");
    default:
      return require("../../../img/file.jpg");
  }
}
