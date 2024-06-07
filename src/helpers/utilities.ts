import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import supabase from "src/third-party/supabase";
import dayjs from "dayjs";

export const createBucket = async (uuid: string) => {
  const { data, error } = await supabase.storage.createBucket(uuid, { public: true });
  if (error) return Promise.reject(error);
  else return Promise.resolve(data);
};

export const deleteBucket = async (uuid: string) => {
  await supabase.storage.emptyBucket(uuid);
  await supabase.storage.deleteBucket(uuid);
};

export const uploadImage = async (uuid: string, file: any) => {
  const fileName = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage.from(uuid).upload(fileName, file.originFileObj);

  if (error) return Promise.reject(error);

  const response = supabase.storage.from(uuid).getPublicUrl(data.path);
  return Promise.resolve(response.data.publicUrl);
};

export const deleteImage = async (uuid: string, imageUrl: string) => {
  const imageName = getImageNameFromImageUrl(imageUrl) || "";
  const { data, error } = await supabase.storage.from(uuid).remove([imageName]);

  if (error) return Promise.reject(error);
  else return Promise.resolve(data);
};

export const updateImage = async (newImages: any, item: any, imagePath: string) => {
  const oldImage = item[imagePath]?.[0] || null;
  const newImage = newImages?.[0] || null;

  //case 1: prev image and curr image are empty
  if (_.isEmpty(newImage) && _.isEmpty(oldImage)) {
    return "";
  }

  //case 2: prev image and curr image are not empty
  if (!_.isEmpty(newImage) && !_.isEmpty(oldImage)) {
    const oldImageName = getImageNameFromImageUrl(oldImage.url);
    const newImageName = newImage.name;

    //case 2.1: prev image and curr image are the same
    if (oldImageName === newImageName) {
      return oldImage.url;
    }
    //case 2.2: prev image is different from curr image
    else {
      await deleteImage(item.id, oldImage.url);
      const newImageUrl = await uploadImage(item.id, newImage);
      return newImageUrl;
    }
  }

  //case 3: prev image is empty and curr image is not empty
  if (_.isEmpty(oldImage) && !_.isEmpty(newImage)) {
    const newImageUrl = await uploadImage(item.id, newImage);
    return newImageUrl;
  }

  //case 4: prev image is not empty and curr image is empty
  if (!_.isEmpty(oldImage) && _.isEmpty(newImage)) {
    await deleteImage(item.id, oldImage.url);
    return "";
  }
};

export const getImageNameFromImageUrl = (imageUrl: string) => {
  return _.last(_.split(imageUrl, "/"));
};

export const convertImagUrlToUploadItem = (imageUrl: string) => {
  if (_.isEmpty(imageUrl)) return [];
  const imageName = getImageNameFromImageUrl(imageUrl);
  return [{ uid: uuidv4(), name: imageName, status: "done", url: imageUrl }];
};

export const convertDayToString = (day: any, format?: "start" | "end") => {
  if (_.isEmpty(day)) return null;
  if (format === "start") dayjs(day).startOf("day").toISOString();
  if (format === "end") return dayjs(day).endOf("day").toISOString();
  return dayjs(day).toISOString();
};

export const convertStringToDay = (dayString: string) => {
  return _.isEmpty(dayString) ? null : dayjs(dayString);
};
