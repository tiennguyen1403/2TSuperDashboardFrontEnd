import supabase from "src/third-party/supabase";

export const createUserImageFolder = async (uid: string) => {
  try {
    await supabase.storage.createBucket(uid, { public: true });
  } catch (error) {
    return Promise.reject(error);
  }
};

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

export const clearUserBuckets = async (userIds: string[]) => {
  try {
    const emptyRequests = userIds.map(async (uid) => {
      return await supabase.storage.emptyBucket(uid);
    });
    const deleteRequests = userIds.map(async (uid) => {
      return await supabase.storage.deleteBucket(uid);
    });

    await Promise.all(emptyRequests);
    await Promise.all(deleteRequests);
  } catch (error) {
    return Promise.reject(error);
  }
};
