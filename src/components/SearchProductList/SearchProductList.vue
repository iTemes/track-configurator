<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const emit = defineEmits(["closeFilters", "addLight"]);

const loading = computed(() => store.state.products.loading);

const productList = computed(() => store.state.products.productList);

const getProductsList = () => {
  store.dispatch("products/getProducts");
};

function closePopupWindow() {
  emit("closeFilters");
}

function addLight(subproduct, evt) {
  evt.preventDefault();
  emit("addLight", subproduct);
}

onMounted(() => {
  getProductsList();
});
</script>
<template>
  <section
    class="products-filter container"
    id="product-list-items"
    :class="{ load: loading }"
    @keyup.esc="closePopupWindow"
    tabindex="0"
    ref="modalFilter"
  >
    <button class="filters-close" @click="closePopupWindow">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.5 3.44l5.5 5.5 4.97-4.97a.75.75 0 1 1 1.06 1.06L11.06 10l4.97 4.97a.75.75 0 1 1-1.06 1.06L10 11.06l-5.5 5.5-1.06-1.06 5.5-5.5-5.5-5.5L4.5 3.44z"
          fill="#151528"
        />
      </svg>
    </button>

    <section
      class="product-finder"
      :class="{ loading: loading }"
      ref="productFinder"
    >
      <div v-if="load" class="content__progress_bar" />
      <div class="content__group d-flex flex-wrap">
        <article
          v-for="subproduct in productList"
          :key="subproduct.id"
          class="content__item"
        >
          <figure class="content__item-box">
            <a
              class="content__item__link"
              :href="subproduct.absolute_url"
              target="_blank"
              @click="addLight(subproduct, $event)"
            >
              <img
                :src="subproduct.icon_image1"
                loading="lazy"
                class="img-responsive"
                width="400"
                height="400"
                alt=""
              />
              <svg
                class="content__item__add"
                width="48px"
                height="48px"
                style="enable-background: new 0 0 512 512"
                fill="#fff"
                viewBox="0 0 512 512"
              >
                <g>
                  <g fill="#fff">
                    <line x1="169.449" x2="342.551" y1="169.449" y2="342.551" />
                    <line x1="342.551" x2="169.449" y1="169.449" y2="342.551" />
                  </g>
                  <g fill="#fff">
                    <path
                      d="M256,59c26.602,0,52.399,5.207,76.677,15.475c23.456,9.921,44.526,24.128,62.623,42.225    c18.098,18.098,32.304,39.167,42.226,62.624C447.794,203.601,453,229.398,453,256c0,26.602-5.206,52.399-15.475,76.677    c-9.922,23.456-24.128,44.526-42.226,62.623c-18.097,18.098-39.167,32.304-62.623,42.226C308.399,447.794,282.602,453,256,453    c-26.602,0-52.399-5.206-76.676-15.475c-23.457-9.922-44.526-24.128-62.624-42.226c-18.097-18.097-32.304-39.167-42.225-62.623    C64.207,308.399,59,282.602,59,256c0-26.602,5.207-52.399,15.475-76.676c9.921-23.457,24.128-44.526,42.225-62.624    c18.098-18.097,39.167-32.304,62.624-42.225C203.601,64.207,229.398,59,256,59 M256,43C138.363,43,43,138.363,43,256    s95.363,213,213,213s213-95.363,213-213S373.637,43,256,43L256,43z"
                    />
                  </g>
                </g>
                <g id="expanded">
                  <g>
                    <path
                      d="M267.314,256l80.894-80.894c3.124-3.124,3.124-8.189,0-11.313c-3.125-3.124-8.189-3.124-11.314,0L256,244.686    l-80.894-80.894c-3.124-3.124-8.189-3.124-11.313,0c-3.125,3.124-3.125,8.189,0,11.313L244.686,256l-80.894,80.894    c-3.125,3.125-3.125,8.189,0,11.314c1.562,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343L256,267.314l80.894,80.894    c1.563,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343c3.124-3.125,3.124-8.189,0-11.314L267.314,256z"
                    />
                    <path
                      d="M256,59c26.602,0,52.399,5.207,76.677,15.475c23.456,9.921,44.526,24.128,62.623,42.225    c18.098,18.098,32.304,39.167,42.226,62.624C447.794,203.601,453,229.398,453,256c0,26.602-5.206,52.399-15.475,76.677    c-9.922,23.456-24.128,44.526-42.226,62.623c-18.097,18.098-39.167,32.304-62.623,42.226C308.399,447.794,282.602,453,256,453    c-26.602,0-52.399-5.206-76.676-15.475c-23.457-9.922-44.526-24.128-62.624-42.226c-18.097-18.097-32.304-39.167-42.225-62.623    C64.207,308.399,59,282.602,59,256c0-26.602,5.207-52.399,15.475-76.676c9.921-23.457,24.128-44.526,42.225-62.624    c18.098-18.097,39.167-32.304,62.624-42.225C203.601,64.207,229.398,59,256,59 M256,43C138.363,43,43,138.363,43,256    s95.363,213,213,213s213-95.363,213-213S373.637,43,256,43L256,43z"
                    />
                  </g>
                </g>
              </svg>
            </a>

            <figcaption
              :key="subproduct.name + 'name'"
              class="content__name content__name-card"
            >
              <a
                class="content__name-card-link"
                :href="subproduct.absolute_url"
                target="_blank"
              >
                <h4 class="content__title content__title--main">
                  {{ subproduct.name }}
                </h4>
              </a>

              <a
                class="visually-hidden"
                v-html="subproduct.title"
                :href="subproduct.absolute_url"
              />
            </figcaption>
          </figure>
        </article>
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: transform 0.3s ease 0.2s, opacity 0.3s ease 0.2s;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}

.filters-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-left: auto;
  margin-top: 20px;
  margin-right: 20px;

  border: 1px solid;
}

.products-filter {
  margin-top: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 80vh;

  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  border-radius: 0.6rem;
}

.product-finder {
  width: 100%;
  flex-grow: 1;

  &.loading {
    opacity: 0.4;
    pointer-events: none;
  }
}

.btn-default[disabled] {
  background-color: #fff;
  opacity: 0.3;
}
.content__group {
  padding-top: 50px;
  margin: 0 -12px 50px;
}

.content__progress_bar {
  position: absolute;
  top: 10px;

  width: 100%;
  height: 4px;
  overflow: hidden;
}

.content__progress_bar:before {
  content: "";
  position: absolute;
  left: 0;

  height: 4px;
  width: 100%;

  transform: translateX(-95%);
  background-color: #000;

  animation: progress 5s ease-in-out 0.1s forwards;
}

.arrow {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  position: relative;
  margin-left: auto;

  border: 2px solid transparent;
  border-radius: 50%;

  display: none;
  &::before,
  &::after {
    content: "";
    top: 9px;
    position: absolute;
    width: 12px;
    height: 2px;
    background-color: #000;
    display: inline-block;
    transition: all 0.2s ease;
  }

  &::before {
    left: 4px;
    transform: rotate(0deg);
  }

  &::after {
    left: 4px;
    transform: rotate(90deg);
  }
}

.content__item {
  margin-bottom: 24px;
  transform: translate3d(0, 0, 0);
  transition: width 0.45s, transform 0.35s;

  &:hover {
    .content__item-box {
      box-shadow: rgba(0, 0, 0, 0.1) 2px 5px 10px -1px,
        rgba(0, 0, 0, 0.01) 0px 10px 10px -3px;
    }
  }
  .content__item-box {
    display: flex;
    flex-direction: column;
    height: 100%;

    overflow: hidden;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    transition: all 0.3s;
  }
  &__link {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      background-color: rgba(0, 0, 0, 0);
      transition: 0.35s;
    }

    img {
      cursor: pointer;
    }
    &:hover {
      &::after {
        background-color: rgba(0, 0, 0, 0.56);
      }
      .content__item__add {
        display: block;
      }
    }
  }
  &__add {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    z-index: 2;
    display: none;
  }
  img {
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    cursor: default;
  }
  a,
  & a img {
    cursor: pointer;
    width: 100%;
  }
}

.product-finder:not(.list) .content__item:hover {
  transform: translate3d(0, -5px, 0);
}

.content__name {
  padding: 1rem;

  padding-top: 30px;
  margin-top: 0;
}

.content__name.content__name-card {
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

.content__name-card-link {
  display: block;
  padding: 1rem;
  padding-top: 30px;
  margin-top: 0;

  text-decoration: none;
  color: inherit;
  font-weight: 400;
}

.product-finder:not(.list) .content__name:hover {
  background-color: #222;
  color: #fff;
}

.content__title {
  font-weight: 500;
  margin: 0;
  padding-right: 0;
  line-height: 18px;
  font-size: 12px;
}

.content__attribute {
  display: flex;
  align-items: center;

  padding: 0;
  margin-bottom: 8px;
}

.content__attribute-text {
  text-transform: capitalize;
  font-size: 14px;
}

.content__attribute-title {
  min-width: 75px;
  font-size: 14px;
}

.btn-project {
  max-width: 180px;
  padding: 10px;
  font-size: 12px;

  &.active {
    background: #000 !important;
    color: #fff !important;
  }
}

.btn-project-text,
.btn-project-text-active {
  font: inherit;
  text-decoration: none;
}

.btn-project .btn-project-text-active {
  display: none;
}

.btn-project.active .btn-project-text {
  display: none;
}

.btn-project.active .btn-project-text-active {
  color: #fff;
  display: block;
}
@media (min-width: 1920px) {
  .product-finder .content__item {
    width: 14.25%;
  }

  .product-finder.list .content__item {
    width: 50%;
  }

  .product-finder.list .content__item-box {
    flex-direction: row;
    justify-content: space-between;
  }

  .product-finder.list .content-item__scheme {
    width: 33%;
  }

  .product-finder.list .content__item__link {
    width: 33%;
  }

  .product-finder.list .content__name {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 33%;
    padding-left: 40px;
  }

  .product-finder.list .content__title--main {
    display: none;
  }

  .content__item img {
    max-width: 300px;
  }

  .product-finder.list .content__item img {
    border-color: transparent;
  }

  .content__item {
    padding-right: 12px;
    padding-left: 12px;
  }

  .content__item img {
    padding-top: 2rem;
    padding-bottom: 2rem;
    background-color: #fff;
  }
}

@media (max-width: 1919px) {
  .content__group {
    justify-content: space-between;
  }
  .content__item {
    width: 19%;

    .content__item-box {
      height: 100%;
    }
  }

  .content__attribute {
    flex-wrap: wrap;

    font-size: 12px;
  }

  .subproduct__angle {
    flex-wrap: wrap;
  }

  .btn-project {
    font-size: 10px;
  }
}

@media (max-width: 1023px) {
  .content__item {
    width: 45%;

    .content__item-box {
      height: 100%;
    }
  }

  .content__name-card-link {
    padding: 0.5rem;
  }

  .content__title {
    font-size: 0.75rem;
  }

  .product-finder {
    width: 100%;
    padding-left: 0;
    padding-bottom: 60px;
  }

  .arrow {
    display: flex;
    margin-right: 0;
    border-color: #000;
  }

  .content__group {
    padding-top: 20px;
    margin-bottom: 10px;
    justify-content: space-between;
  }
}

@media (max-width: 767px) {
  .content__item {
    width: 49%;
  }

  .content__name {
    flex-grow: 1;
  }

  .btn-project {
    margin-top: 30px;
  }
}

@keyframes progress {
  from {
    transform: translateX(-95%);
  }

  to {
    transform: translateX(0);
  }
}
</style>
