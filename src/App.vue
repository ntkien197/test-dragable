<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
export default {
    metaInfo() {
        return {
            title: 'Admin config',
            titleTemplate: '%s | Draggable'
        }
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    //text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

html {
    box-sizing: border-box;
}

* {
    margin: 0;
    padding: 0;
}

*, *:before, *:after {
    box-sizing: border-box;
}

input,
textarea,
select,
button {
    outline: none;
}

input {
    line-height: normal;
}

label,
button {
    cursor: pointer;
}

a {
    text-decoration: none;
}

img {
    display: block;
    max-width: 100%;
}

ul {
    list-style: none;
}
</style>
