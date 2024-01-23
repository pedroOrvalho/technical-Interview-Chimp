import {
  Toolbar,
  alpha,
  Typography,
  Tooltip,
  IconButton,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

type Props = {
  numSelected: number;
  selected: readonly number[];
};

export default function ProductsTableToolbar({ numSelected, selected }: Props) {
  const onClickDelete = async () => {
    for (const id of selected) {
      await axios
        .delete(`http://localhost:4000/product/delete/${id}`)
        .then((res) => {
          if (res.status === 200) {
            alert(`Item with ID ${id} deleted.`);
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            alert(
              "It's not possible to delete the item because it's connected to another"
            );
          }
        });
    }
  };
  return (
    <div>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Nutrition
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon onClick={() => onClickDelete()} />
            </IconButton>
          </Tooltip>
        ) : null}
      </Toolbar>
    </div>
  );
}
