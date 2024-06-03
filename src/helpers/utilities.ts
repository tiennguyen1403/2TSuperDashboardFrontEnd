import supabaseClient from "src/third-party/supabase";

export const createUserImageFolder = async (uid: string) => {
  try {
    await supabaseClient.storage.createBucket(uid, { public: true });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const clearUserBuckets = async (userIds: string[]) => {
  try {
    const emptyRequests = userIds.map(async (uid) => {
      return await supabaseClient.storage.emptyBucket(uid);
    });
    const deleteRequests = userIds.map(async (uid) => {
      return await supabaseClient.storage.deleteBucket(uid);
    });

    await Promise.all(emptyRequests);
    await Promise.all(deleteRequests);
  } catch (error) {
    return Promise.reject(error);
  }
};
