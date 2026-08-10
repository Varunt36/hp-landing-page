// src/pages/admin/ListStat.tsx
// The dashboard's "count → View → list → Download Excel" pattern, in one
// place. Each caller supplies an accent colour, the columns and the rows.

import type { ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { countryMeta } from "../../data/data";

export function CountryCell({ code }: { code: string }) {
  if (!code || code === "—") return <>—</>;
  const meta = countryMeta(code);
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: 0.75, height: "100%" }}
    >
      <span>{meta.flag}</span>
      <span>{meta.label}</span>
    </Box>
  );
}

interface ListStatCardProps {
  accent: string;
  title: string;
  subtitle?: string;
  count: number;
  caption: string;
  onView: () => void;
  children?: ReactNode;
}

export function ListStatCard({
  accent,
  title,
  subtitle,
  count,
  caption,
  onView,
  children,
}: ListStatCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        flex: "1 1 260px",
        minWidth: 0,
        borderRadius: "16px",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: accent,
        },
      }}
    >
      <CardContent sx={{ pt: 2, pb: "12px !important" }}>
        <Box sx={{ mb: 1.25 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={600}
            fontSize={12}
            sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block" }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {children}

        <Box
          onClick={onView}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 2,
            bgcolor: `${accent}0d`,
            border: "1px solid",
            borderColor: `${accent}25`,
            px: 1.5,
            py: 1,
            cursor: "pointer",
            transition: "background-color .15s, border-color .15s",
            "&:hover": { bgcolor: `${accent}1a`, borderColor: `${accent}50` },
          }}
        >
          <Box>
            <Typography
              fontWeight={800}
              fontSize={{ xs: 20, sm: 24 }}
              color={accent}
              lineHeight={1}
            >
              {count}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
              fontSize={11}
            >
              {caption}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: accent }}>
            View →
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

interface ListStatDialogProps {
  open: boolean;
  onClose: () => void;
  accent: string;
  title: string;
  subtitle?: string;
  count: number;
  unit?: string;
  empty: string;
  columns: { label: string; align?: "center" }[];
  onDownload: () => void;
  children: ReactNode;
}

export function ListStatDialog({
  open,
  onClose,
  accent,
  title,
  subtitle,
  count,
  unit = "member",
  empty,
  columns,
  onDownload,
  children,
}: ListStatDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 3 } } }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, pb: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: `${accent}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: accent,
            flexShrink: 0,
            fontWeight: 800,
          }}
        >
          {count}
        </Box>
        <Box>
          <Typography fontWeight={700} fontSize="1.1rem">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {count === 0 ? (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography color="text.secondary">{empty}</Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ px: 3, pb: 1 }}>
              <Chip
                label={`${count} ${unit}${count !== 1 ? "s" : ""}`}
                size="small"
                color="success"
                sx={{ fontWeight: 700 }}
              />
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: "rgba(107,74,150,0.06)" }}>
                    {columns.map((c) => (
                      <TableCell
                        key={c.label}
                        align={c.align}
                        sx={{ fontWeight: 700 }}
                      >
                        {c.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>{children}</TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
          Close
        </Button>
        <Button
          onClick={onDownload}
          variant="contained"
          disabled={count === 0}
          sx={{ borderRadius: 2, fontWeight: 700 }}
        >
          Download Excel ({count})
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function IndexCell({ value }: { value: number }) {
  return (
    <TableCell sx={{ color: "text.secondary", fontSize: 12 }}>{value}</TableCell>
  );
}
