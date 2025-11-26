<script lang="ts" setup>
const title = ref("");
const description = ref("");
const completed = ref(false);

const emit = defineEmits<{
  (
    e: "submit",
    payload: { title: string; description: string; completed: boolean },
  ): void;
}>();

function handleSubmit() {
  emit("submit", {
    title: title.value,
    description: description.value,
    completed: completed.value,
  });
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="title">Title</label>
      <input v-model="title" type="text" name="title" id="title" />
    </div>
    <div>
      <label for="description">Description</label>
      <input
        v-model="description"
        type="text"
        name="description"
        id="description"
      />
    </div>
    <div>
      <label for="completed">Completed</label>
      <input
        v-model="completed"
        type="checkbox"
        name="completed"
        id="completed"
        title="Completed"
      />
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>
