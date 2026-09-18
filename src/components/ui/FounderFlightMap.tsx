import { DESTINATIONS } from "../../lib/content";

/**
 * Geographic city positions used only for the visual flight-network map.
 * The map itself is a real world outline; these points place the AirGen
 * training destinations approximately on their corresponding cities.
 */
const CITY_COORDINATES: Record<string, [lat: number, lon: number]> = {
  hyderabad: [17.3850, 78.4867],
  us: [33.4484, -112.0740],
  ca: [43.6532, -79.3832],
  za: [-26.2041, 28.0473],
  au: [-37.8136, 144.9631],
  nz: [-43.5321, 172.6362],
  uk: [51.7520, -1.2577],
  es: [40.4168, -3.7038],
  ae: [25.2048, 55.2708],
  ph: [14.5995, 120.9842],
};

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 480;

const MIN_LAT = -60;
const MAX_LAT = 85;

type MapPoint = {
  id: string;
  label: string;
  city: string;
  country?: string;
  regulator?: string;
  aircraft?: string;
  coordinates?: [number, number];

  x: number;
  y: number;

  isHub: boolean;
};

type MapRoute = MapPoint & {
  d: string;
  delay: string;
};

function project([lat, lon]: [number, number]) {
  return {
    x: ((lon + 180) / 360) * MAP_WIDTH,
    y: ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * MAP_HEIGHT,
  };
}

const hub: MapPoint = {
  id: "hyderabad",
  label: "HYDERABAD",
  city: "HYDERABAD",
  ...project(CITY_COORDINATES.hyderabad),
  isHub: true,
};

const destinations: MapPoint[] = DESTINATIONS.map((item) => {
  const city = item.city || item.id.toUpperCase();
  const label = city.toUpperCase();

  return {
    id: item.id,
    label,
    city,
    country: item.country,
    regulator: item.regulator,
    aircraft: item.aircraft,
    coordinates: item.coordinates,
    ...project(CITY_COORDINATES[item.id] ?? [0, 0]),
    isHub: false,
  };
});

const points: MapPoint[] = [hub, ...destinations];

const routes: MapRoute[] = destinations.map((point, index) => {
  const direction = point.x >= hub.x ? 1 : -1;

  const dx = Math.abs(point.x - hub.x);

  const curve =
    Math.min(92, 34 + dx * 0.14) * direction;

  const midX =
    (hub.x + point.x) / 2;

  const midY =
    Math.min(hub.y, point.y) -
    Math.min(
      105,
      28 + Math.abs(point.y - hub.y) * 0.18
    );

  return {
    ...point,

    d: `M ${hub.x.toFixed(1)} ${hub.y.toFixed(1)}
        Q ${(midX + curve).toFixed(1)} ${midY.toFixed(1)}
        ${point.x.toFixed(1)} ${point.y.toFixed(1)}`,

    delay: `${index * 0.38}s`,
  };
});

export function GlobalFlightMap() {
  return (
    <div
      className="global-flight-map"
      aria-label="AirGen global flight training network"
    >
      {/* =====================================================
          TOPLINE
      ====================================================== */}

      <div className="global-flight-map-topline">
        <span>GLOBAL TRAINING NETWORK</span>
        <span>{String(destinations.length).padStart(2, "0")} DESTINATIONS</span>
      </div>

      {/* =====================================================
          MAP CANVAS
      ====================================================== */}

      <div className="global-flight-map-canvas">
        {/* Dark map */}
        <img
          className="world-map world-map-dark"
          src="/assets/maps/world-dark.svg"
          alt=""
          aria-hidden="true"
        />

        {/* Light map */}
        <img
          className="world-map world-map-light"
          src="/assets/maps/world-light.svg"
          alt=""
          aria-hidden="true"
        />

        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          role="img"
          aria-hidden="true"
        >
          <defs>
            {/* =================================================
                MAP DOT PATTERN
            ================================================= */}

            <pattern
              id="airgen-map-dots"
              width="12"
              height="12"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="2"
                cy="2"
                r="1"
                className="map-dot"
              />
            </pattern>

            {/* =================================================
                GLOW FILTER
            ================================================= */}

            <filter
              id="airgen-map-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur
                stdDeviation="3"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* =================================================
                ROUTE GRADIENT
            ================================================= */}

            <linearGradient
              id="airgen-map-route"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop
                offset="0%"
                stopColor="currentColor"
                stopOpacity="0.15"
              />

              <stop
                offset="50%"
                stopColor="currentColor"
                stopOpacity="1"
              />

              <stop
                offset="100%"
                stopColor="currentColor"
                stopOpacity="0.35"
              />
            </linearGradient>
          </defs>

          {/* =================================================
              BACKGROUND GRID
          ================================================= */}

          <rect
            x="0"
            y="0"
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            className="map-grid-fill"
          />

          {/* =================================================
              GRATICULE
          ================================================= */}

          <g
            className="map-graticule"
            aria-hidden="true"
          >
            {[120, 190, 260, 330, 400].map((y) => (
              <path
                key={`horizontal-${y}`}
                d={`M0 ${y} H${MAP_WIDTH}`}
              />
            ))}

            {[100, 220, 340, 460, 580, 700, 820, 940].map(
              (x) => (
                <path
                  key={`vertical-${x}`}
                  d={`M${x} 0 V${MAP_HEIGHT}`}
                />
              )
            )}
          </g>

          {/* =================================================
              ROUTES
          ================================================= */}

          <g className="map-routes">
            {routes.map((route) => (
              <path
                key={route.id}
                d={route.d}
                pathLength="1"
                style={{
                  animationDelay: route.delay,
                }}
              />
            ))}
          </g>

          {/* =================================================
              DESTINATION RINGS
          ================================================= */}

          <g className="map-destination-links">
            {routes.map((route) => (
              <circle
                key={`${route.id}-ring`}
                cx={route.x}
                cy={route.y}
                r="7"
                className="map-destination-ring"
                style={{
                  animationDelay: route.delay,
                }}
              />
            ))}
          </g>

          {/* =================================================
              HUB + DESTINATION POINTS
          ================================================= */}

          <g filter="url(#airgen-map-glow)">
            {points.map((point) => (
              <g
                key={point.id}
                transform={`translate(${point.x.toFixed(
                  1
                )} ${point.y.toFixed(1)})`}
                className={
                  point.isHub
                    ? "map-point map-point-hub"
                    : "map-point"
                }
              >
                {/* Outer halo */}
                <circle
                  r={point.isHub ? 12 : 6.5}
                  className="map-point-halo"
                />

                {/* Core */}
                <circle
                  r={point.isHub ? 4.5 : 2.6}
                  className="map-point-core"
                />

                {/* Hub label */}
                {point.isHub && (
                  <text
                    x="18"
                    y="4"
                  >
                    {point.label}
                  </text>
                )}
              </g>
            ))}
          </g>

          {/* =================================================
              SCAN LINES
          ================================================= */}

          <path
            className="map-scanline"
            d={`M0 ${MAP_HEIGHT * 0.4} H${MAP_WIDTH}`}
          />

          <path
            className="map-scanline map-scanline-2"
            d={`M0 ${MAP_HEIGHT * 0.405} H${MAP_WIDTH}`}
          />
        </svg>

        {/* ===================================================
            VIGNETTE
        ==================================================== */}

        <div
          className="map-vignette"
          aria-hidden="true"
        />
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div className="global-flight-map-footer">
        <span>ONE HUB</span>
        <span>GLOBAL PATHWAYS</span>
        <span>DGCA · FAA · EASA</span>
      </div>
    </div>
  );
}