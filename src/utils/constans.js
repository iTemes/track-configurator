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
export const MIN_SUPPLY = 86;

/* Наименования БП для корзины */
export const POWER_SUPPLY = {
  "integrated-control": [
    {
      name: "INF POWER SUPPLY 86W-48 BK",
      color: "black",
      value: 86,
      id: 4758,
    },
    {
      name: "INF POWER SUPPLY 86W-48 WH",
      color: "white",
      value: 86,
      id: 7352,
    },
    {
      name: "INF POWER SUPPLY 100W BK",
      color: "black",
      value: 100,
      id: 5634,
    },
    {
      name: "INF POWER SUPPLY 100W WH",
      color: "white",
      value: 100,
      id: 7154,
    },
    {
      name: "INF POWER SUPPLY 250W BK",
      color: "black",
      value: 250,
      id: 7351,
    },
    {
      name: "INF POWER SUPPLY 250W WH",
      color: "white",
      value: 250,
      id: 7353,
    },
  ],
  "external-control": [
    {
      name: "ИП 100 Вт",
      color: "black",
      value: 100,
      id: 8556,
    },
    {
      name: "ИП 250 Вт",
      color: "black",
      value: 250,
      id: 7408,
    },
    {
      name: "ИП 400 Вт",
      color: "black",
      value: 400,
      id: 4288,
    },
    {
      name: "ИП 500 Вт",
      color: "black",
      value: 500,
      id: 4289,
    },
    {
      name: "ИП 960 Вт",
      color: "black",
      value: 960,
      id: 4044,
    },
  ],
};
// Аксессуары по типам встраивания
export const ACCESSORIES_CART_ID = {
  recessed: {
    black: {
      track: {
        name: "INF TRACK T51 BP DALI 2",
        id: 8299,
      },
      corners: {
        name: "INF CORNER T51 BP DALI 2",
        id: 11803,
      },
      corner_connector: {
        name: "INF CONNECTOR 90 BP DALI 2",
        id: 11133,
      },
      stubs: {
        name: "CAP INF TRACK T51 BP",
        id: 11813,
      },
      total_connectors: {
        name: "INF CONNECTOR 180 BP DALI 2",
        id: 11132,
      },
      total_metalic_connectors: {
        name: "INF CON 180",
        id: 9984,
      },
      is_power_adaptor: {
        name: "INF POWER CONNECTOR BP DALI 2",
        id: 11134,
      },
      is_smart_light: {
        name: "INF SMART LIGHT",
        id: 10521,
      },
    },
    white: {
      track: {
        name: "INF TRACK T51 WD DALI 2",
        id: 8300,
      },
      corners: {
        name: "INF CORNER T51 WD DALI 2",
        id: 11804,
      },
      corner_connector: {
        name: "INF CONNECTOR 90 WP DALI 2",
        id: 11136,
      },
      stubs: {
        name: "CAP INF TRACK T51 WD",
        id: 11814,
      },
      total_connectors: {
        name: "INF CONNECTOR 180 WP DALI 2",
        id: 11135,
      },
      total_metalic_connectors: {
        name: "INF CON 180",
        id: 9984,
      },
      is_power_adaptor: {
        name: "INF POWER CONNECTOR WP DALI 2",
        id: 11137,
      },
      is_smart_light: {
        name: "INF SMART LIGHT",
        id: 10521,
      },
    },
  },
  surface: {
    black: {
      track: {
        name: "INF TRACK C54 BP DALI 2",
        id: 8301,
      },
      corners: {
        name: "INF CORNER C54 BP DALI 2",
        id: 11799,
      },
      corner_connector: {
        name: "INF CONNECTOR 90 BP DALI 2",
        id: 11133,
      },
      stubs: {
        name: "CAP INF TRACK C54 BP",
        id: 11811,
      },
      total_connectors: {
        name: "INF CONNECTOR 180 BP DALI 2",
        id: 11132,
      },
      total_metalic_connectors: {
        name: "INF CON C54 180",
        id: 11807,
      },
      is_power_adaptor: {
        name: "INF POWER CONNECTOR BP DALI 2",
        id: 11134,
      },
      is_smart_light: {
        name: "INF SMART LIGHT",
        id: 10521,
      },
    },
    white: {
      track: {
        name: "INF CORNER C54 WD DALI 2",
        id: 8302,
      },
      corners: {
        name: "INF CORNER T51 WD DALI 2",
        id: 11800,
      },
      corner_connector: {
        name: "INF CONNECTOR 90 WP DALI 2",
        id: 11136,
      },
      stubs: {
        name: "CAP INF TRACK C54 WD",
        id: 11812,
      },
      total_connectors: {
        name: "INF CONNECTOR 180 BP DALI 2",
        id: 11132,
      },
      total_metalic_connectors: {
        name: "INF CON C54 180",
        id: 11807,
      },
      is_power_adaptor: {
        name: "INF POWER CONNECTOR WP DALI 2",
        id: 11137,
      },
      is_smart_light: {
        name: "INF SMART LIGHT",
        id: 10521,
      },
    },
  },
  suspended: {
    black: {
      track: {
        name: "INF TRACK C54 BP DALI 2",
        id: 8301,
      },
      total_suspension: {
        "suspension-tros": {
          name: "ПОДВЕС SS.TUBE 4M.B",
          id: 4642,
        },
        "suspension-tros-hide": {
          name: "SS.IN 4M.BK",
          id: 5032,
        },
      },
      suspension_clips: {
        name: "INF CLIPS PDNT BP",
        id: 11809,
      },
      corners: {
        name: "INF CORNER C54 BP DALI 2",
        id: 11799,
      },
      corner_connector: {
        name: "INF CONNECTOR 90 BP DALI 2",
        id: 11133,
      },
      stubs: {
        name: "CAP INF TRACK C54 BP",
        id: 11811,
      },
      total_connectors: {
        name: "INF CONNECTOR 180 BP DALI 2",
        id: 11132,
      },
      total_metalic_connectors: {
        name: "INF CON C54 180",
        id: 11807,
      },
      is_power_adaptor: {
        name: "INF POWER CONNECTOR BP DALI 2",
        id: 11134,
      },
      is_smart_light: {
        name: "INF SMART LIGHT",
        id: 10521,
      },
    },
    white: {
      track: {
        name: "INF CORNER C54 WD DALI 2",
        id: 8302,
      },
      total_suspension: {
        "suspension-tros": {
          name: "ПОДВЕС SS.TUBE 4M.W",
          id: 4688,
        },
        "suspension-tros-hide": {
          name: "SS.IN 4M.WH",
          id: 5031,
        },
      },
      suspension_clips: {
        name: "INF CLIPS PDNT WD",
        id: 11810,
      },
      corners: {
        name: "INF CORNER T51 WD DALI 2",
        id: 11800,
      },
      corner_connector: {
        name: "INF CONNECTOR 90 WP DALI 2",
        id: 11136,
      },
      stubs: {
        name: "CAP INF TRACK C54 WD",
        id: 11812,
      },
      total_connectors: {
        name: "INF CONNECTOR 180 WP DALI 2",
        id: 11135,
      },
      total_metalic_connectors: {
        name: "INF CON C54 180",
        id: 11807,
      },
      is_power_adaptor: {
        name: "INF POWER CONNECTOR WP DALI 2",
        id: 11137,
      },
      is_smart_light: {
        name: "INF SMART LIGHT",
        id: 10521,
      },
    },
  },
  "stretch-ceiling": {
    black: {
      track: {
        name: "INF TRACK C54 BP DALI 2",
        id: 8301,
      },
      total_container_for_tracks: {
        name: "CANAL INF STC5857 BK",
        id: 6203,
      },
      canal_caps: {
        name: "CAP CANAL INF STC5857",
        id: 6397,
      },
      corners: {
        name: "INF CORNER C54 BP DALI 2",
        id: 11799,
      },
      corner_connector: {
        name: "INF CONNECTOR 90 BP DALI 2",
        id: 11133,
      },
      stubs: {
        name: "CAP INF TRACK DALI 2",
        id: 6963,
      },
      total_connectors: {
        name: "INF CONNECTOR 180 BP DALI 2",
        id: 11132,
      },
      total_metalic_connectors: {
        name: "INF CON 180",
        id: 9984,
      },
      is_power_adaptor: {
        name: "INF POWER CONNECTOR BP DALI 2",
        id: 11134,
      },
      is_smart_light: {
        name: "INF SMART LIGHT",
        id: 10521,
      },
    },
    white: {
      track: {
        name: "INF CORNER C54 WD DALI 2",
        id: 8302,
      },
      total_container_for_tracks: {
        name: "CANAL INF STC5857 BK",
        id: 6203,
      },
      canal_caps: {
        name: "CAP CANAL INF STC5857",
        id: 6397,
      },
      corners: {
        name: "INF CORNER T51 WD DALI 2",
        id: 11800,
      },
      corner_connector: {
        name: "INF CONNECTOR 90 WP DALI 2",
        id: 11136,
      },
      stubs: {
        name: "CAP INF TRACK DALI 2",
        id: 6963,
      },
      total_connectors: {
        name: "INF CONNECTOR 180 WP DALI 2",
        id: 11135,
      },
      total_metalic_connectors: {
        name: "INF CON 180",
        id: 9984,
      },
      is_power_adaptor: {
        name: "INF POWER CONNECTOR WP DALI 2",
        id: 11137,
      },
      is_smart_light: {
        name: "INF SMART LIGHT",
        id: 10521,
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
