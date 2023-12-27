import { format } from "date-fns/esm";
import { getDownloadURL, getStorage, uploadBytes, ref } from "firebase/storage";

export const uriToBlob = async (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error("uriToBlob failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);

    xhr.send(null);
  });
};

export const uploadImageToStorage = async ({
  imageUrl,
  imageId,
  imageName,
  folderName,
}) => {
  const storage = getStorage();

  const blobFile = await uriToBlob(imageUrl);

  if (blobFile.size > 1000000) {
    console.log("size more then 1mb");
    return;
  }
  const metadata = {
    contentType: "image/jpg",
  };

  const storageRef = ref(
    storage,
    `${folderName}/` + imageId + `/${imageName}.jpg`
  );

  await uploadBytes(storageRef, blobFile, metadata);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};

export const getCurrentDateAndTime = () => {
  const currentDate = new Date();
  const formattedDateTime = format(currentDate, "MMMM d, yyyy, HH:mm:ss");
  return formattedDateTime;
};
