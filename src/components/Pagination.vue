<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li v-if="currentPage !== 1" class="page-item">
            <a class="page-link" @click="$emit('click', currentPage - 1)">Previous</a>
          </li>
          <li 
            v-for="page in numberOfPages"
            class="page-item" 
            :class="currentPage === page ? 'active' : '' "
            >
            <a class="page-link" @click="$emit('click', page)">{{page}}</a>
          </li>
          <li v-if="numberOfPages !== currentPage" class="page-item">
            <a class="page-link" @click="$emit('click', currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
</template>
<script>

export default {
    props:{
        currentPage: {
            type: Number,
            required: true,
        },
        numberOfPages:{
            type: Number,
            required: true,
        }
    },
}
</script>
<style>
    
</style>