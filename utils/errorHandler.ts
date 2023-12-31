import { message } from "antd";

/**
 * @description - This function is used to handle errors in the client application.
 *
 * @param {Error} error - The error object
 * @param {Utility} dispatch - The dispatch function
 * @param {String} constant - The constant to be used in the reducer
 * @Author - Austin Howard
 * @lastModified - 2022-07-22
 * @modifiedBy - Austin Howard
 * @version - 1.0.0
 */
export default (error: any) => {
  const messageTxt = error.response && error.response.data.message ? error.response.data.message : error.message;
  if (messageTxt === "Not authorized, token failed") {
    // logout();
  }
  console.log("ERROR");

  message.error(messageTxt);
  return message;
};
