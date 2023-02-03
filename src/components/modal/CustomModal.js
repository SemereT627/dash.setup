import * as React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[400],
          }}
        >
          <Icon icon={closeFill} width={20} height={20} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function CustomModal({
  isOpen,
  onClose,
  title,
  children,
  width = 400,
}) {
  return (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ width: `${width}px` }}>
          {children}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
