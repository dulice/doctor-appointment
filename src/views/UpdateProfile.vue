<template>
  <div>
    <v-card variant="tonal" class="w-xs-100 w-75 mx-auto">
      <v-card-title class="text-center">Information Detail</v-card-title>
      <v-card-text>
        <v-form v-model="form" @submit.prevent="handleSubmit">
          <div>
            <label for="profile" class="d-flex justify-center">
              <img class="profile" v-if="avatar" :src="avatar" alt="" />
              <img class="profile" v-else :src="addImg" alt="" />
            </label>
            <input
              class="d-none"
              type="file"
              name="avatar"
              id="profile"
              accept="image/*"
              @change="handleUploadImage"
            />
          </div>
          <v-text-field
            color="primary"
            variant="outlined"
            :readonly="loading"
            :rules="[required]"
            label="Username"
            prependIcon="mdi-account"
            v-model="username"
          />

          <v-text-field
            color="primary"
            variant="outlined"
            :rules="[required]"
            label="Email"
            :disabled="true"
            prependIcon="mdi-email"
            v-model="email"
          />

          <v-select
            label="Are you..."
            :items="['Patient', 'Doctor']"
            v-model="role"
            prependIcon="mdi-account-question"
            variant="outlined"
            :rules="[required]"
            :readonly="loading"
          ></v-select>

          <v-expand-transition v-show="role === 'Doctor'">
            <v-select
              label="Profession..."
              :items="professionItems"
              v-model="profession"
              prependIcon="mdi-wallet-travel"
              variant="outlined"
              :readonly="loading"
            ></v-select>
          </v-expand-transition>

          <v-btn
            variant="flat"
            color="primary"
            block
            type="submit"
            :disabled="!form"
            :loading="loading"
            >Update</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toast-notification";
import { supabase } from "../lib/supabaseClient";
import addImg from "../assets/addImg.png";
import {
  VCard,
  VCardTitle,
  VCardText,
  VSelect,
  VForm,
  VTextField,
  VBtn,
  VExpandTransition,
} from "vuetify/lib/components/index.mjs";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/users";

const username = ref(null);
const email = ref(null);
const role = ref(null);
const form = ref(false);
const loading = ref(false);
const toast = useToast();
const store = useUserStore();
const router = useRouter();
const file = ref(null);
const filePath = ref(null);
const avatar = ref(null);
const id = ref(null);
const profession = ref("General");
const professionItems = ref([
  "Neurology",
  "Pregency",
  "Cardiologoy",
  "Dental",
  "Dermatology",
  "Urology",
  "General",
]);

onMounted(async () => {
  await store.getUser();
  if (store.user) {
    username.value = store.user.username;
    email.value = store.user.email;
    role.value = store.user.role;
    profession.value = store.user.profession;
    avatar.value = store.user.avatar;
    id.value = store.user.id;
  }
});

const handleUploadImage = async (e) => {
  file.value = e.target.files[0];
  filePath.value = Date.now() + "_" + file.value.name.split(".").shift();
  avatar.value = URL.createObjectURL(file.value);
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    if (file.value) {
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath.value, file.value);
      if (uploadError) throw uploadError;
    }
    const { error } = await supabase.from("profiles").upsert(
      {
        id: id.value,
        email: email.value,
        username: username.value,
        role: role.value,
        avatar: filePath.value,
        profession: role.value === "Doctor" ? profession.value : null,
      },
      { returning: "minimal" }
    );

    if (error) throw error;
    await store.getUser();
    toast.success("Update Success", 3000);
    router.push({ name: "Home" });
  } catch (error) {
    toast.error(error);
  } finally {
    loading.value = false;
  }
};

function required(v) {
  return !!v || "Field is required";
}
</script>

<style scoped>
.profile {
  width: 200px;
  height: 200px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 2rem;
  border-radius: 50%;
}
</style>
