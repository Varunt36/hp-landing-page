import { Fragment, type ReactNode } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { C } from "../../theme/theme";

const subLabelSx = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: C.gold700,
  mb: 0.5,
};

const bodyTextSx = {
  fontSize: { xs: 14, md: 14.5 },
  lineHeight: 1.6,
  color: C.ink,
};

function Ornament() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.25,
        mt: 1.75,
        color: C.gold600,
        fontSize: 14,
      }}
    >
      <Box
        sx={{
          height: "1px",
          width: 40,
          background: `linear-gradient(to right, transparent, ${C.gold500}, transparent)`,
        }}
      />
      ✦
      <Box
        sx={{
          height: "1px",
          width: 40,
          background: `linear-gradient(to left, transparent, ${C.gold500}, transparent)`,
        }}
      />
    </Box>
  );
}

const CAR_RENTALS = [
  { label: "Sixt", href: "https://www.sixt.com" },
  { label: "Hertz", href: "https://www.hertz.com" },
  { label: "Europcar", href: "https://www.europcar.com" },
];

const TRANSIT_STEPS: {
  icon: ReactNode;
  place: string;
  note: ReactNode;
  legTime?: string;
  options?: { main: string; sub: string }[];
}[] = [
  {
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 16l9-3 9-3 1 1-9 3-9 3z" />
        <path d="M11 13l3 5" />
        <path d="M11 13L8 7" />
      </svg>
    ),
    place: "BER Airport",
    note: "Proceed to Terminal 1, Level U2 railway station.",
    legTime: "12 min",
    options: [
      { main: "FEX Train (Flughafen-Express)", sub: "Runs every 15 min" },
      { main: "RB 20", sub: "towards Berlin Hbf · hourly" },
    ],
  },
  {
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="3" width="16" height="14" rx="2" />
        <path d="M4 11h16" />
        <path d="M8 21l2-4M16 21l-2-4" />
      </svg>
    ),
    place: "Berlin Südkreuz",
    note: "Exit to the bus stop.",
    legTime: "17 min",
    options: [
      { main: "Bus M46", sub: "towards S+U Alexanderplatz" },
      { main: "Bus 106", sub: "towards U Seestraße" },
    ],
  },
  {
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M10 12h4M10 16h4" />
      </svg>
    ),
    place: "Exit Bus Stops",
    note: (
      <Box component="span" sx={{ display: "block" }}>
        <Box component="span" sx={{ display: "block" }}>
          Bus M46 →{" "}
          <Box component="span" sx={{ fontWeight: 700, color: C.purple800 }}>
            Schillstraße
          </Box>
        </Box>
        <Box component="span" sx={{ display: "block" }}>
          Bus 106 →{" "}
          <Box component="span" sx={{ fontWeight: 700, color: C.purple800 }}>
            Lützowplatz
          </Box>
        </Box>
      </Box>
    ),
  },
];

function TransitTimeline() {
  return (
    <Box sx={{ mt: 1 }}>
      {TRANSIT_STEPS.map((step, i) => {
        const isLast = i === TRANSIT_STEPS.length - 1;
        return (
          <Box key={step.place} sx={{ display: "flex", gap: 1.5 }}>
            {/* Rail: dot + connecting line */}
            <Box
              sx={{
                position: "relative",
                flexShrink: 0,
                width: 30,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {!isLast && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 30,
                    bottom: -18,
                    left: "calc(50% - 1px)",
                    width: "2px",
                    background: C.lavender200,
                  }}
                />
              )}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: C.lavender50,
                  border: `1px solid ${C.gold500}80`,
                  color: C.purple700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {step.icon}
              </Box>
            </Box>

            {/* Content */}
            <Box sx={{ pb: isLast ? 0 : 2.5, minWidth: 0, flex: 1 }}>
              <Typography
                sx={{
                  fontSize: { xs: 14.5, md: 15 },
                  fontWeight: 700,
                  color: C.purple800,
                  lineHeight: 1.3,
                }}
              >
                {step.place}
              </Typography>
              <Typography sx={{ ...bodyTextSx, color: C.purple600, mt: 0.25 }}>
                {step.note}
              </Typography>

              {step.options && (
                <Box
                  sx={{
                    mt: 1,
                    border: `1px solid ${C.lavender200}`,
                    borderRadius: "12px",
                    background: C.cream,
                    p: 1.25,
                  }}
                >
                  {step.legTime && (
                    <Box
                      component="span"
                      sx={{
                        display: "inline-block",
                        fontSize: 10.5,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: C.gold700,
                        background: C.lavender100,
                        borderRadius: "999px",
                        px: 1,
                        py: 0.25,
                        mb: 1,
                      }}
                    >
                      ⏱ {step.legTime}
                    </Box>
                  )}
                  <Box sx={{ display: "flex", alignItems: "stretch", gap: 1.25 }}>
                    {step.options.map((opt, oi) => (
                      <Fragment key={opt.main}>
                        {oi > 0 && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              flexShrink: 0,
                            }}
                          >
                            <Box
                              component="span"
                              sx={{
                                fontSize: 13,
                                fontWeight: 700,
                                fontStyle: "italic",
                                color: C.gold700,
                              }}
                            >
                              or
                            </Box>
                          </Box>
                        )}
                        <Box sx={{ flex: 1, minWidth: 0, pl: oi > 0 ? 1.5 : 0 }}>
                          <Typography
                            sx={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: C.purple800,
                              lineHeight: 1.3,
                            }}
                          >
                            {opt.main}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 12,
                              color: C.purple600,
                              lineHeight: 1.35,
                            }}
                          >
                            {opt.sub}
                          </Typography>
                        </Box>
                      </Fragment>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

const REACH: {
  icon: ReactNode;
  title: string;
  detail: ReactNode;
  time?: string;
}[] = [
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="3" width="16" height="14" rx="2" />
        <path d="M4 11h16" />
        <path d="M8 7h8" />
        <path d="M8 21l2-4M16 21l-2-4" />
      </svg>
    ),
    title: "By Public Transport",
    detail: (
      <>
        <TransitTimeline />
        <Box
          sx={{
            mt: 1.5,
            display: "flex",
            gap: 1,
            alignItems: "flex-start",
            background: C.lavender100,
            border: `1px solid ${C.lavender300}`,
            borderLeft: `4px solid ${C.gold500}`,
            borderRadius: "10px",
            p: 1.25,
          }}
        >
          <Box component="span" sx={{ mt: "1px" }}>
            🚶
          </Box>
          <Typography
            sx={{
              fontSize: 13.5,
              color: C.purple800,
              fontWeight: 600,
              lineHeight: 1.5,
            }}
          >
            From both bus stops it&rsquo;s a 3&ndash;4 min walk to the hotel.
          </Typography>
        </Box>
      </>
    ),
    time: "Total journey · ~ 35 min",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
        <path d="M3.5 11h17v5a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1z" />
        <path d="M6.5 14h.01M17.5 14h.01" />
      </svg>
    ),
    title: "By Taxi & Car",
    detail: (
      <>
        <Box sx={{ mb: 1.5 }}>
          <Typography sx={subLabelSx}>By Taxi · 30–45 min</Typography>
          <Typography sx={{ ...bodyTextSx, color: C.purple600 }}>
            Estimated fare €60 – €70. Book via Uber, FreeNow or Bolt, or take a
            taxi in person from the stand outside the airport.
          </Typography>
        </Box>

        <Box sx={{ borderTop: `1px dashed ${C.lavender200}`, my: 1.5 }} />

        <Box>
          <Typography sx={subLabelSx}>By Car · ~ 26 min</Typography>
          <Box
            component="a"
            href="https://www.google.com/maps/dir/Berlin+Brandenburg+Airport+(BER)/Hotel+Berlin+Berlin,+L%C3%BCtzowplatz+17,+10785+Berlin"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              mt: 0.5,
              mb: 1,
              fontSize: 13,
              fontWeight: 600,
              color: C.purple700,
              textDecoration: "none",
              border: `1px solid ${C.lavender300}`,
              borderRadius: "999px",
              px: 1.5,
              py: 0.5,
              transition: "background .2s, border-color .2s",
              "&:hover": {
                background: C.lavender100,
                borderColor: C.purple700,
              },
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            Navigate from Airport
          </Box>
          <Typography
            sx={{
              fontSize: { xs: 14, md: 15 },
              fontWeight: 700,
              color: C.purple800,
              mb: 0.75,
            }}
          >
            You can rent a car from the platforms below each link opens their
            booking page:
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {CAR_RENTALS.map(({ label, href }) => (
              <Box
                key={label}
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: C.purple700,
                  border: `1px solid ${C.lavender300}`,
                  borderRadius: "999px",
                  px: 1.25,
                  py: 0.35,
                  textDecoration: "none",
                  transition: "background .2s, border-color .2s",
                  "&:hover": {
                    background: C.lavender100,
                    borderColor: C.purple700,
                  },
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
          <Typography
            sx={{ fontSize: 14, color: C.purple800, fontWeight: 700, mt: 1 }}
          >
            Paid parking on site approx. €20 – €25 per day.
          </Typography>
        </Box>
      </>
    ),
  },
];

export default function VenueSection() {
  const reachCard = {
    background: C.cream,
    border: `1px solid ${C.lavender200}B3`,
    borderRadius: "18px",
    p: { xs: 3, md: 3.5 },
    boxShadow: "0 1px 2px rgba(60,30,90,0.06)",
    transition:
      "transform .25s ease, border-color .25s ease, box-shadow .25s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      borderColor: `${C.gold500}80`,
      boxShadow: "0 4px 14px rgba(60,30,90,0.08)",
    },
  };

  return (
    <Box
      id="venue"
      sx={{
        background: `linear-gradient(180deg, ${C.cream} 0%, ${C.lavender50} 100%)`,
        py: { xs: 10, md: 13 },
      }}
    >
      <Container maxWidth="lg">
        {/* ── Section header ── */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 6 } }}>
          <Typography
            component="span"
            sx={{
              fontFamily: '"Blue Mirage", serif',
              fontSize: "1rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.purple600,
              fontWeight: 600,
            }}
          >
            Where it happens
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1,
              color: C.purple800,
              fontFamily: '"Blue Mirage", serif',
            }}
          >
            The Venue
          </Typography>
          <Ornament />
        </Box>

        {/* ── Venue card ── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
            background: C.cream,
            border: `1px solid ${C.lavender200}B3`,
            borderRadius: "22px",
            overflow: "hidden",
            boxShadow:
              "0 4px 14px rgba(60,30,90,0.08), 0 12px 40px rgba(60,30,90,0.06)",
            mb: { xs: 8, md: 10 },
          }}
        >
          {/* Info side */}
          <Box sx={{ p: { xs: 3.5, md: 6 } }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Blue Mirage", serif',
                fontSize: {
                  xs: "1.75rem",
                  md: "clamp(1.9rem, 3.4vw, 2.75rem)",
                },
                color: C.purple800,
              }}
            >
              Hotel Berlin, Berlin
            </Typography>
            <Typography sx={{ mt: 1.5, color: C.purple600, lineHeight: 1.75 }}>
              Set in the heart of west Berlin at Lützowplatz a serene yet
              central setting for satsaṅg, music, prasād and quiet reflection.
            </Typography>

            <Box component="dl" sx={{ mt: 3, display: "grid", gap: 2.25 }}>
              {[
                { dt: "Address", dd: "Lützowplatz 17, 10785 Berlin, Germany" },
                { dt: "Nearest Airport", dd: "Berlin Brandenburg (BER)" },
                { dt: "Phone", dd: "+49 30 26050" },
              ].map(({ dt, dd }) => (
                <Box key={dt}>
                  <Typography
                    component="dt"
                    sx={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: C.gold700,
                      fontWeight: 600,
                    }}
                  >
                    {dt}
                  </Typography>
                  <Typography
                    component="dd"
                    sx={{
                      mt: 0.5,
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: { xs: "1.1rem", md: "1.2rem" },
                      color: C.purple800,
                      fontStyle: "italic",
                      ml: 0,
                    }}
                  >
                    {dd}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2.5,
                mt: 3.5,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                href="https://www.google.com/maps/dir/?api=1&destination=Hotel+Berlin+Berlin+L%C3%BCtzowplatz+17+10785+Berlin"
                target="_blank"
                rel="noopener"
                component="a"
                startIcon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
                  </svg>
                }
              >
                Get Directions
              </Button>
            </Box>
          </Box>

          {/* Map side */}
          <Box
            sx={{
              background: C.lavender100,
              minHeight: { xs: 260, md: 360 },
              position: "relative",
              order: { xs: -1, md: 0 },
            }}
          >
            <Box
              component="iframe"
              title="Hotel Berlin location"
              src="https://maps.google.com/maps?q=Hotel%20Berlin%20Berlin%2C%20L%C3%BCtzowplatz%2017%2C%2010785%20Berlin&t=&z=15&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              sx={{
                border: 0,
                width: "100%",
                height: "100%",
                display: "block",
                filter: "saturate(0.85) hue-rotate(-8deg)",
                minHeight: { xs: 260, md: 360 },
              }}
            />
          </Box>
        </Box>

        {/* ── How to reach ── */}
        <Box>
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
            <Typography
              component="span"
              sx={{
                fontFamily: '"Blue Mirage", serif',
                fontSize: "1rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: C.purple600,
                fontWeight: 600,
              }}
            >
              Getting here
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mt: 1,
                color: C.purple800,
                fontFamily: '"Blue Mirage", serif',
              }}
            >
              How to reach the venue
            </Typography>
            <Ornament />
          </Box>

          {/* Main card: From BER Airport to Hotel */}
          <Box component="article" sx={reachCard}>
            {/* Card header */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                mb: { xs: 2.5, md: 3 },
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: C.lavender50,
                  border: `1px solid ${C.gold500}80`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.purple700,
                  flexShrink: 0,
                  mb: 1.5,
                }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 16l9-3 9-3 1 1-9 3-9 3z" />
                  <path d="M11 13l3 5" />
                  <path d="M11 13L8 7" />
                </svg>
              </Box>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: C.gold700,
                  fontWeight: 600,
                }}
              >
                Getting to the venue
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.375rem", md: "1.6rem" },
                  color: C.purple800,
                  fontFamily: '"Blue Mirage", serif',
                  lineHeight: 1.2,
                }}
              >
                From BER Airport to Hotel
              </Typography>
            </Box>

            {/* Two travel modes side by side */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: { xs: 3, md: 4 },
              }}
            >
              {REACH.map(({ icon, title, detail, time }, i) => (
                <Box
                  key={title}
                  sx={{
                    pt: { xs: i > 0 ? 3 : 0, md: 0 },
                    pl: { md: i > 0 ? 4 : 0 },
                    borderTop: {
                      xs: i > 0 ? `1px dashed ${C.lavender200}` : "none",
                      md: "none",
                    },
                    borderLeft: {
                      md: i > 0 ? `1px dashed ${C.lavender200}` : "none",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1.75,
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: C.lavender50,
                        border: `1px solid ${C.gold500}80`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: C.purple700,
                        flexShrink: 0,
                        "& svg": { width: 19, height: 19 },
                      }}
                    >
                      {icon}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: { xs: "1.15rem", md: "1.25rem" },
                        fontWeight: 700,
                        color: C.purple800,
                        fontFamily: '"Blue Mirage", serif',
                      }}
                    >
                      {title}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      fontSize: { xs: 14, md: 14.5 },
                      lineHeight: 1.6,
                      color: C.ink,
                    }}
                  >
                    {detail}
                  </Box>
                  {time && (
                    <Typography
                      sx={{
                        display: "block",
                        mt: 1.75,
                        fontSize: "0.65rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: C.gold700,
                        fontWeight: 600,
                        pt: 1.5,
                        borderTop: `1px dashed ${C.lavender200}`,
                      }}
                    >
                      {time}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>

          {/* From Berlin Hauptbahnhof — full-width row */}
          <Box
            component="article"
            sx={{
              ...reachCard,
              mt: { xs: 2.5, md: 2.75 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: C.lavender50,
                border: `1px solid ${C.gold500}80`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.purple700,
                mb: 1.75,
              }}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="10" rx="2" />
                <path d="M2 11h20" />
                <path d="M7 7V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2" />
                <path d="M6 21l2-4M18 21l-2-4" />
              </svg>
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "1.3rem", md: "1.375rem" },
                color: C.purple800,
                fontFamily: '"Blue Mirage", serif',
              }}
            >
              From Berlin Hauptbahnhof
            </Typography>
            <Typography
              sx={{
                ...bodyTextSx,
                color: C.purple600,
                mt: 1.25,
                maxWidth: 620,
              }}
            >
              Take S-Bahn S3, S5 or S7 two stops to Zoologischer Garten, then
              ride bus 100 or 200 to Lützowplatz the stop is directly in front
              of the hotel.
            </Typography>
            <Typography
              sx={{
                display: "block",
                mt: 1.75,
                fontSize: "0.65rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: C.gold700,
                fontWeight: 600,
                pt: 1.5,
                borderTop: `1px dashed ${C.lavender200}`,
              }}
            >
              By Public Transport · 25 min
            </Typography>
          </Box>

          {/* Ticket guidelines + useful tools */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
              gap: { xs: 2.5, md: 2.75 },
              mt: { xs: 2.5, md: 2.75 },
            }}
          >
            <Box component="article" sx={reachCard}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: C.lavender50,
                  border: `1px solid ${C.gold500}80`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.purple700,
                  mb: 1.75,
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-2z" />
                  <path d="M13 6v1.5M13 10.75v2.5M13 17v1" />
                </svg>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.3rem", md: "1.375rem" },
                  color: C.purple800,
                  fontFamily: '"Blue Mirage", serif',
                }}
              >
                Ticket Guidelines
              </Typography>
              <Box
                sx={{
                  borderTop: `1px dashed ${C.lavender200}`,
                  mt: 1.25,
                  mb: 1.5,
                }}
              />
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  p: 0,
                  m: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.1,
                }}
              >
                <Box
                  component="li"
                  sx={{
                    display: "flex",
                    gap: 0.75,
                    fontSize: { xs: 14, md: 14.5 },
                    lineHeight: 1.6,
                    color: C.ink,
                    alignItems: "baseline",
                  }}
                >
                  <Box component="span" sx={{ color: C.gold600 }}>
                    •
                  </Box>
                  <Box>
                    <Typography
                      component="span"
                      sx={{ fontWeight: 700, color: C.purple800 }}
                    >
                      Type:{" "}
                    </Typography>
                    <Box
                      component="span"
                      sx={{
                        background: C.lavender100,
                        color: C.purple800,
                        fontWeight: 600,
                        borderRadius: "6px",
                        px: 0.75,
                        py: 0.15,
                      }}
                    >
                      Single Ticket Berlin ABC
                    </Box>
                  </Box>
                </Box>
                <Box
                  component="li"
                  sx={{
                    display: "flex",
                    gap: 0.75,
                    fontSize: { xs: 14, md: 14.5 },
                    lineHeight: 1.6,
                    color: C.ink,
                    alignItems: "baseline",
                  }}
                >
                  <Box component="span" sx={{ color: C.gold600 }}>
                    •
                  </Box>
                  <Box>
                    <Typography
                      component="span"
                      sx={{ fontWeight: 700, color: C.purple800 }}
                    >
                      Fare:{" "}
                    </Typography>
                    <Box
                      component="span"
                      sx={{
                        background: "#F3DFA0",
                        color: C.gold700,
                        fontWeight: 700,
                        borderRadius: "6px",
                        px: 0.75,
                        py: 0.15,
                      }}
                    >
                      €5.00
                    </Box>
                  </Box>
                </Box>
                <Box
                  component="li"
                  sx={{
                    display: "flex",
                    gap: 0.75,
                    fontSize: { xs: 14, md: 14.5 },
                    lineHeight: 1.6,
                    color: C.ink,
                  }}
                >
                  <Box component="span" sx={{ color: C.gold600 }}>
                    •
                  </Box>
                  <Box>
                    <Typography
                      component="span"
                      sx={{ fontWeight: 700, color: C.purple800 }}
                    >
                      Validity:{" "}
                    </Typography>
                    <Typography component="span" sx={{ color: C.purple700 }}>
                      120 minutes (one-way journey).
                    </Typography>
                  </Box>
                </Box>
                <Box
                  component="li"
                  sx={{
                    display: "flex",
                    gap: 0.75,
                    fontSize: { xs: 14, md: 14.5 },
                    lineHeight: 1.6,
                    color: C.ink,
                  }}
                >
                  <Box component="span">⚠️</Box>
                  <Box>
                    <Typography
                      component="span"
                      sx={{ fontWeight: 700, color: C.purple800 }}
                    >
                      Note:{" "}
                    </Typography>
                    <Typography component="span" sx={{ color: C.purple700 }}>
                      Paper tickets must be validated on the platform{" "}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{ fontWeight: 700, color: C.purple700 }}
                    >
                      before boarding
                    </Typography>
                    .
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box component="article" sx={reachCard}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: C.lavender50,
                  border: `1px solid ${C.gold500}80`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.purple700,
                  mb: 1.75,
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="7" y="2" width="10" height="20" rx="2" />
                  <path d="M11 18h2" />
                </svg>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.3rem", md: "1.375rem" },
                  color: C.purple800,
                  fontFamily: '"Blue Mirage", serif',
                }}
              >
                Useful Tools
              </Typography>
              <Box
                sx={{
                  borderTop: `1px dashed ${C.lavender200}`,
                  mt: 1.25,
                  mb: 1.5,
                }}
              />
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  p: 0,
                  m: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.1,
                }}
              >
                <Box
                  component="li"
                  sx={{
                    display: "flex",
                    gap: 0.75,
                    fontSize: { xs: 14, md: 14.5 },
                    lineHeight: 1.6,
                    color: C.ink,
                  }}
                >
                  <Box component="span" sx={{ color: C.gold600 }}>
                    •
                  </Box>
                  <Box>
                    <Typography
                      component="span"
                      sx={{ fontWeight: 700, color: C.purple800 }}
                    >
                      Live Routes:{" "}
                    </Typography>
                    <Typography component="span" sx={{ color: C.purple700 }}>
                      Official{" "}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{ fontWeight: 700, color: C.purple700 }}
                    >
                      BVG Fahrinfo
                    </Typography>{" "}
                    <Typography component="span" sx={{ color: C.purple700 }}>
                      App available on iOS &amp; Android.
                    </Typography>
                  </Box>
                </Box>
                <Box
                  component="li"
                  sx={{
                    display: "flex",
                    gap: 0.75,
                    fontSize: { xs: 14, md: 14.5 },
                    lineHeight: 1.6,
                    color: C.ink,
                  }}
                >
                  <Box component="span" sx={{ color: C.gold600 }}>
                    •
                  </Box>
                  <Box>
                    <Typography
                      component="span"
                      sx={{ fontWeight: 700, color: C.purple800 }}
                    >
                      Purchase:{" "}
                    </Typography>
                    <Typography component="span" sx={{ color: C.purple700 }}>
                      Station ticket machines or online via BVG App.
                    </Typography>
                  </Box>
                </Box>
                <Box
                  component="li"
                  sx={{
                    display: "flex",
                    gap: 0.75,
                    fontSize: { xs: 14, md: 14.5 },
                    lineHeight: 1.6,
                    color: C.ink,
                  }}
                >
                  <Box component="span" sx={{ color: C.gold600 }}>
                    •
                  </Box>
                  <Box>
                    <Typography
                      component="span"
                      sx={{ fontWeight: 700, color: C.purple800 }}
                    >
                      Media Links:{" "}
                    </Typography>
                    <Typography component="span" sx={{ color: C.purple700 }}>
                      Watch the{" "}
                    </Typography>
                    <Box
                      component="a"
                      href="https://drive.google.com/drive/folders/11XlNVvUJz2jmJ4KcOWn2LrrRwboLwSbN?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontWeight: 700,
                        color: C.purple700,
                        textDecoration: "underline",
                      }}
                    >
                      Helpful Video Guides
                    </Box>{" "}
                    <Typography component="span" sx={{ color: C.purple700 }}>
                      directly here.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Support contact */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              mt: { xs: 2.5, md: 2.75 },
              background: C.lavender100,
              border: `1px solid ${C.lavender300}`,
              borderLeft: `4px solid ${C.gold500}`,
              borderRadius: "14px",
              p: { xs: 2.5, md: 3 },
            }}
          >
            <Box sx={{ color: C.purple700, mt: 0.25, flexShrink: 0 }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: C.purple800,
                  fontSize: { xs: "0.95rem", md: "1rem" },
                  fontFamily: '"Blue Mirage", serif',
                  mb: 0.5,
                }}
              >
                Support Contact
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 14.5 },
                  color: C.ink,
                  lineHeight: 1.6,
                }}
              >
                If you have any questions, please contact{" "}
                <Typography
                  component="span"
                  sx={{ fontWeight: 700, color: C.purple700 }}
                >
                  Nirav Gevariya
                </Typography>{" "}
                on WhatsApp at{" "}
                <Box
                  component="a"
                  href="https://wa.me/4917657613438"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontWeight: 700,
                    color: C.purple700,
                    textDecoration: "underline",
                  }}
                >
                  +49 176 57613438
                </Box>
                . Safe travels to the Mahotsav!
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
