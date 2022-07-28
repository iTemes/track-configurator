<script></script>

<template>
  <header class="page-header">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-12 col-xl-2 logo">
          <!-- eslint-disable -->
          <a
            class="logo-text"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Track Config</p>
          </a>
        </div>
        <div class="col-md-12 col-xl-10 navigation">
          <nav class="main-nav">
            <ul
              class="main-nav__list d-flex align-items-center justify-content-xl-center"
            >
              <li>
                <router-link to="/" exact-path>{{
                  $t("header.step", [1])
                }}</router-link>
              </li>
              <li>
                <router-link to="/secondStep" exact-path>{{
                  $t("header.step", [2])
                }}</router-link>
              </li>
              <li>
                <router-link to="/thirdStep" exact-path>
                  {{ $t("header.step", [3]) }}
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped lang="scss">
.page-header {
  background-color: $primary;
}

.logo-text {
  text-decoration: none;
  color: #000;
  font-weight: 700;
  font-size: 2rem;
}

.main-nav {
  color: $textcolor;
  &__list {
    padding: 0;
    list-style: none;
    margin-bottom: 0;

    @include media-breakpoint-down(xl) {
      justify-content: space-between;
    }
  }
  li {
    @include media-breakpoint-down(xl) {
      width: 33%;
    }
  }
  a {
    position: relative;

    display: block;
    overflow: hidden;
    padding: 1.75rem;

    font-family: BellGothic, $systemfont;
    font-size: $fontsizeS;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: inherit;
    text-decoration: none;

    &.router-link-exact-active {
      background-color: $secondary;
      font-weight: 600;

      &::before {
        transform: translate3d(0, 0, 0);
      }
    }

    &:hover {
      &::before {
        transform: translate3d(0, 0, 0);
      }
    }

    &::before {
      position: absolute;
      content: "";
      bottom: 0px;
      left: 0;
      right: 0;

      display: block;
      width: 100%;
      height: 5px;

      background-color: $accent;

      transform: translate3d(0, 8px, 0);
      transition: 0.35s ease-in-out;
    }

    &[disabled] {
      pointer-events: none;
    }

    @include media-breakpoint-down(xl) {
      padding: 1rem 1.4rem;

      text-align: center;
    }
  }
}

.navigation {
  @include media-breakpoint-down(xl) {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
