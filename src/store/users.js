import { defineStore } from "pinia";
import { supabase } from "../lib/supabaseClient";
import { useToast } from "vue-toast-notification";

const toast = useToast();
export const useUserStore = defineStore("user", {
  state: () => ({ user: null, doctors: null }),
  actions: {
    async getUser() {
      try {
        const { data: auth } = await supabase.auth.getUser();
        if (auth.user) {
          const { data } = await supabase
            .from("profiles")
            .select()
            .eq("id", auth.user.id)
            .single();
          if (data.avatar && !data.avatar.includes("https")) {
            const { data: image, error } = await supabase.storage
              .from("avatars")
              .download(data.avatar);
            if (error) toast.error(error);
            data.avatar = URL.createObjectURL(image);
          }
          this.user = data;
        }
      } catch (error) {
        toast.error(error, 3000);
      }
    },
    async signInWithProvider(data) {
      try {
        const { data: userData, error: profileError } = await supabase
          .from("profiles")
          .upsert({
            id: data.user.id,
            email: data.user.email,
            username: data.user.user_metadata.name,
            avatar: data.user.user_metadata.avatar_url,
          })
          .select()
          .single();
        if (profileError) throw profileError;
        this.user = userData;
      } catch (error) {
        toast.error(error);
      }
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.user = null;
    },
    async getDoctors(count) {
      try {
        const { data } = await supabase
          .from("profiles")
          .select()
          .eq("role", "Doctor").limit(count);

        Promise.all(
          data.map(async (el) => {
            if (el.avatar && !el.avatar.includes("https")) {
              const { data, error } = await supabase.storage
                .from("avatars")
                .download(el.avatar);
              if (error) toast.error(error);
              el.avatar = URL.createObjectURL(data);
            }
            return el;
          })
        ).then((res) => (this.doctors = res));
      } catch (error) {
        toast.error(error);
      }
    },
  },
});
