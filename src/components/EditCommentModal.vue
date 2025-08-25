<!--
  Edit Comment Modal Component
  Modal dialog for editing existing comments
  Provides a form interface with cancel and save options
-->
<template>
  <!-- Modal overlay with click-outside-to-close functionality -->
  <div class="modal-overlay" @click.self="close">
    <div class="modal enhanced-modal p-8 rounded-xl max-w-lg w-full mx-auto mt-32">
      <!-- Modal header -->
      <h3 class="text-xl font-bold text-gray-900 mb-6 text-center">Éditer le commentaire</h3>

      <!-- Comment edit form -->
      <form @submit.prevent="submit">
        <!-- Comment content textarea -->
        <textarea
          v-model="editedContent"
          class="input w-full mb-6 text-gray-900 bg-white/90"
          rows="4"
        ></textarea>

        <!-- Action buttons -->
        <div class="flex justify-end gap-3">
          <!-- Cancel button -->
          <button
            type="button"
            class="btn bg-gray-300 text-gray-800 hover:bg-gray-400"
            @click="close"
          >
            Annuler
          </button>
          <!-- Save button -->
          <button type="submit" class="btn bg-blue-600 text-white hover:bg-blue-700">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
/**
 * Edit Comment Modal Script
 * Handles comment editing functionality and modal state management
 */

import { ref, watch, defineProps, defineEmits } from 'vue'

// Component props
const props = defineProps({
  modelValue: Boolean, // Controls modal visibility
  comment: Object, // Comment object to edit
})

// Component events
const emit = defineEmits(['update:modelValue', 'save'])

// Local reactive state
const editedContent = ref(props.comment?.content || '')

// Watch for comment changes to update local state
watch(
  () => props.comment,
  (val) => {
    editedContent.value = val?.content || ''
  },
)

/**
 * Close the modal by emitting update event
 */
function close() {
  emit('update:modelValue', false)
}

/**
 * Submit the edited comment and close modal
 */
function submit() {
  emit('save', editedContent.value)
  close()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 20, 30, 0.85);
  z-index: 100;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.enhanced-modal {
  background: rgba(255, 255, 255, 0.98);
  border: 2px solid #2563eb;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  min-width: 320px;
  color: #1e293b;
}
.enhanced-modal h3 {
  color: #1e293b;
}
.input {
  color: #1e293b;
}
</style>
