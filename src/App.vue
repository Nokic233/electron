<template>
    <div class="titlebar">{{ titlebar }}</div>
    <h1>💖 Hello World!</h1>
    <div>Welcome to your Electron application.</div>
    <div>
        {{
            `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
        }}
    </div>

    <div>
        <div>
            Current theme source: <strong id="theme-source">{{ themeSource }}</strong>
        </div>
        <button id="toggle-dark-mode" @click="onToggleDarkModeClick">Toggle Dark Mode</button>
        <button id="reset-to-system" @click="onResetToSystemClick">Reset to System Theme</button>
    </div>

    <div>
        Title: <input v-model="inputValue" />
        <button type="button" @click="onSetTitleClick">Set</button>
    </div>

    <div>
        File path: <strong>{{ filePathText }}</strong>
        <button type="button" @click="onOpenFileClick">Open a File</button>
    </div>

    <div>
        <div>Increment: 'Alt+Cmd+I' : 'Alt+Shift+I'</div>
        <div>Decrement: 'Alt+Cmd+O' : 'Alt+Shift+O'</div>
        Current value: <strong>{{ counter }}</strong>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

console.log('👋 This message is being logged by "App.vue", included via Vite');

const titlebar = ref('Cool Titlebar');
const versions = computed(() => window.versions);

const themeSource = ref('System');
async function onToggleDarkModeClick() {
    const isDarkMode = await window.darkMode.toggle();
    themeSource.value = isDarkMode ? 'Dark' : 'Light';
}
async function onResetToSystemClick() {
    await window.darkMode.system();
    themeSource.value = 'System';
}

const inputValue = ref('');
function onSetTitleClick() {
    window.electronAPI.setTitle(inputValue.value);
    titlebar.value = inputValue.value;
}

const filePathText = ref('');
async function onOpenFileClick() {
    const filePath = await window.electronAPI.openFile();
    filePathText.value = filePath;
}

const counter = ref(0);
window.electronAPI.onUpdateCounter(value => {
    const oldValue = Number(counter.value);
    const newValue = oldValue + value;
    counter.value = newValue;
    window.electronAPI.counterValue(newValue);
});
</script>

<style lang="scss">
.titlebar {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    app-region: drag;
}
</style>
