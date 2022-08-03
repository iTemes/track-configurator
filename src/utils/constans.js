export const START_IMAGE_PATH =
  "https://www.centrsvet.ru/media/uploads/svetilnik/trekovie_svetilniki/inf_config";
export const TRACK_SIZE = 2500;
export const VER_TRACK_WIDTH = 30;
export const VER_TRACK_HEIGHT = 250;
export const HOR_TRACK_WIDTH = 250;
export const HOR_TRACK_HEIGHT = 30;
export const TRACK_OFFSET = 2;
export const MAX_CANVAS_HEIGHT = 1000;
export const VER_TYPE = "VER";
export const VER_TYPE_REVERS = "VER-REVERS";
export const HOR_TYPE = "HOR";
export const HOR_TYPE_REVERS = "HOR-REVERS";
export const SUSPENDED = "suspended";
export const SHAPE_SQUARE = "shape-square";
export const STRETCH_CEILING = "stretch-ceiling";
export const RECESSED = "recessed";
export const EXTERNAL_CONTROL = "external-control";

/* Наименования БП для корзины */
export const POWER_SUPPLY = {
  surface_supply: [
    {
      name: "ИП 100 Вт",
      color: "default",
      value: 100,
      id: 8556,
    },
    {
      name: "ИП 250 Вт",
      color: "default",
      value: 250,
      id: 7408,
    },
    {
      name: "ИП 400 Вт",
      color: "default",
      value: 400,
      id: 4288,
    },
    {
      name: "ИП 500 Вт",
      color: "default",
      value: 500,
      id: 4289,
    },
    {
      name: "ИП 960 Вт",
      color: "default",
      value: 960,
      id: 4044,
    },
  ],
  flex_supply: [
    {
      name: "ИП 100 Вт",
      color: "default",
      value: 100,
      id: 8556,
    },
    {
      name: "ИП 250 Вт",
      color: "default",
      value: 250,
      id: 7408,
    },
    {
      name: "ИП 400 Вт",
      color: "default",
      value: 400,
      id: 4288,
    },
    {
      name: "ИП 500 Вт",
      color: "default",
      value: 500,
      id: 4289,
    },
    {
      name: "ИП 960 Вт",
      color: "default",
      value: 960,
      id: 4044,
    },
  ],
  track_supply: [
    {
      name: "AUR POWER SUPPLY 200W-48 DALI",
      color: "auroom",
      value: 200,
      id: 12011,
    },
    {
      name: "AUR POWER SUPPLY 200W-48 DALI",
      color: "black",
      value: 200,
      id: 12113,
    },
  ],
  ceiling_supply: [
    {
      name: "AUR POWER BOX 150W",
      color: "auroom",
      value: 150,
      id: 7430,
    },
    {
      name: "AUR POWER BOX 240W",
      color: "auroom",
      value: 240,
      id: 7091,
    },
    {
      name: "AUR POWER BOX 100W",
      color: "black",
      value: 100,
      id: 11660,
    },
    {
      name: "AUR POWER BOX 240W",
      color: "black",
      value: 240,
      id: 11659,
    },
  ],
};

// Аксессуары по типам встраивания
export const ACCESSORIES_CART_ID = {
  surface: {
    auroom: {
      track: {
        name: "AUR TRACK 2500",
        id: 7025,
      },
      corners: {
        name: "AUR CON DUO BASE 50",
        id: 8530,
      },
      total_suspension: {
        "surface-50": {
          name: "AUR CON BASE 50",
          id: 8529,
        },
        "surface-100": {
          name: "AUR CON BASE 100",
          id: 8528,
        },
      },
      surface_supply: {
        "surface-50": {
          name: "AUR POWER BASE 50",
          id: 10366,
        },
        "surface-100": {
          name: "AUR POWER BASE 100",
          id: 10367,
        },
      },
      flex_supply: {
        "surface-50": {
          name: "AUR POWER BASE",
          id: 7028,
        },
        "surface-100": {
          name: "AUR POWER BASE",
          id: 7028,
        },
      },
    },
    black: {
      track: {
        name: "AUR BLACK TRACK 2500",
        id: 11649,
      },
      corners: {
        name: "AUR BLACK CON DUO BASE 50",
        id: 11652,
      },
      total_suspension: {
        "surface-50": {
          name: "AUR BLACK CON BASE 50",
          id: 11651,
        },
        "surface-100": {
          name: "AUR BLACK CON BASE 100",
          id: 11650,
        },
      },
      surface_supply: {
        "surface-50": {
          name: "AUR BLACK POWER BASE 50",
          id: 11657,
        },
        "surface-100": {
          name: "AUR BLACK POWER BASE 100",
          id: 11656,
        },
      },
      flex_supply: {
        "surface-50": {
          name: "AUR POWER BASE",
          id: 11655,
        },
        "surface-100": {
          name: "AUR POWER BASE",
          id: 11655,
        },
      },
    },
  },
  suspended: {
    auroom: {
      track: {
        name: "AUR TRACK 2500",
        id: 7025,
      },
      total_suspension: {
        default: {
          name: "AUR TROS",
          id: 9090,
        },
      },
      corners: {
        name: "AUR TROS DUO",
        id: 9091,
      },
      flex_supply: {
        default: {
          name: "AUR POWER BASE",
          id: 7028,
        },
      },
    },
    black: {
      track: {
        name: "AUR BLACK TRACK 2500",
        id: 11649,
      },
      total_suspension: {
        default: {
          name: "AUR TROS",
          id: 11653,
        },
      },
      corners: {
        name: "AUR TROS DUO",
        id: 11654,
      },
      flex_supply: {
        default: {
          name: "AUR POWER BASE",
          id: 11655,
        },
      },
    },
  },
};
// Объект возможных фигур
export const SHAPE = {
  "shape-line": {
    corners: 0,
    sides: {
      side_B: {
        side_image: "line_B",
        name: "Сторона - A",
        title: "sideB",
        type: "horizont",
        tracks: [],
        side_total_tracks: 0,
        side_total_length: 0,
        side_connectors: 0,
      },
    },
    stubs: 1,
  },
  "shape-corner": {
    corners: 1,
    sides: {
      side_A: {
        side_image: "side_A",
        name: "Сторона - А",
        title: "sideA",
        type: "vertical",
        tracks: [],
        side_total_tracks: 0,
        side_total_length: 0,
        side_connectors: 0,
      },
      side_B: {
        side_image: "side_B",
        name: "Сторона - B",
        title: "sideB",
        type: "horizont",
        tracks: [],
        side_total_tracks: 0,
        side_total_length: 0,
        side_connectors: 0,
      },
    },
    stubs: 1,
  },
  "shape-u": {
    corners: 2,
    sides: {
      side_A: {
        side_image: "side_u_A",
        name: "Сторона - А",
        title: "sideA",
        type: "vertical",
        tracks: [],
        side_total_tracks: 0,
        side_total_length: 0,
        side_connectors: 0,
      },
      side_B: {
        side_image: "side_u_B",
        name: "Сторона - B",
        title: "sideB",
        type: "horizont",
        tracks: [],
        side_total_tracks: 0,
        side_total_length: 0,
        side_connectors: 0,
      },
      side_C: {
        side_image: "side_u_C",
        name: "Сторона - C",
        title: "sideC",
        type: "vertical-left",
        tracks: [],
        side_total_tracks: 0,
        side_total_length: 0,
        side_connectors: 0,
      },
    },
    stubs: 1,
  },
  "shape-square": {
    corners: 4,
    sides: {
      side_A: {
        side_image: "side_sq_A",
        name: "Сторона - А",
        title: "sideA",
        type: "vertical",
        tracks: [],
        side_total_tracks: 0,
        side_total_length: 0,
        side_connectors: 0,
      },
      side_B: {
        side_image: "side_sq_B",
        title: "sideB",
        name: "Сторона - B",
        type: "horizont",
        tracks: [],
        side_total_tracks: 0,
        side_total_length: 0,
        side_connectors: 0,
      },
      side_C: {
        side_image: "side_u_C",
        name: "Сторона - C",
        title: "sideC",
        type: "vertical-left",
        tracks: [],
        side_total_tracks: 0,
        side_total_length: 0,
        side_connectors: 0,
      },
      side_D: {
        side_image: "side_u_B",
        name: "Сторона - D",
        title: "sideD",
        type: "horizont-top",
        tracks: [],
        side_total_tracks: 0,
        side_total_length: 0,
        side_connectors: 0,
      },
    },
    stubs: 0,
  },
};
// Максимальная длинна всей системы
export const MAX_LENGTH = 30000;
export const MIN_SIZE = 200;
