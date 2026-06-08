<script setup>
import { ref } from "vue";

const fileInput = ref(null);
const preview = ref(null);
const message = ref("");
const loading = ref(false);
const error = ref("");

function onFileChange(event) {
  const file = event.target.files[0];
  if (!file) {
    preview.value = null;
    return;
  }
  preview.value = URL.createObjectURL(file);
  message.value = "";
  error.value = "";
}

async function uploadPhoto() {
  const file = fileInput.value?.files?.[0];
  if (!file) {
    message.value = "Selecciona una foto";
    return;
  }

  const formData = new FormData();
  formData.append("photo", file);
  loading.value = true;
  error.value = "";
  message.value = "";

  try {
    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    message.value = data.message ?? JSON.stringify(data);
  } catch (err) {
    error.value = "Error al subir la foto";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="container">
    <h1>Subir foto</h1>
    <label class="drop-area" :class="{ 'has-preview': preview }">
      <input
      class="hidden-input"
        type="file"
        ref="fileInput"
        @change="onFileChange"
        accept="image/*"
      />
      <div v-if="preview" class="preview">
        <img :src="preview" alt="Preview" />
      </div>
      <div v-else class="placeholder">
        <span class="icon">📷</span>
        <span>Haz clic o arrastra una foto..</span>
      </div>
    </label>
    <button class="upload-btn" :disabled="loading" @click="uploadPhoto">
      <span v-if="loading">Subiendo...</span>
      <span v-else>Subir Foto</span>
    </button>
    <p class="success" v-if="message">{{ message }}</p>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background: #f0f4f8;
  font-family: "Segoe UI", sans-serif;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  color: #2d3748;
  margin: 0;
}

.drop-area {
  width: 320px;
  height: 320px;
  border: 3px dashed #a0aec0;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #fff;
  transition:
    border-color 0.2s,
    background 0.2s;
  overflow: hidden;
}

.drop-area:hover {
  border-color: #667eea;
  background: #ebf4ff;
}

.drop-area.has-preview {
  border-style: solid;
  border-color: #667eea;
}

.hidden-input {
  display: none;
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: #718096;
  font-size: 0.95rem;
}

.icon {
  font-size: 3rem;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-btn {
  padding: 0.75rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  transition:
    opacity 0.2s,
    transform 0.1s;
}

.upload-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.upload-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success {
  color: #276749;
  background: #c6f6d5;
  padding: 0.6rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
}

.error {
  color: #9b2c2c;
  background: #fed7d7;
  padding: 0.6rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
}
</style>
