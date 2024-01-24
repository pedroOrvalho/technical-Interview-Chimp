import { Box, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

type Props = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search({ searchValue, setSearchValue }: Props) {
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  return (
    <Box className="search_container">
      <div className="search_icon">
        <SearchOutlinedIcon fontSize="large" />
      </div>
      <TextField
        hiddenLabel
        value={searchValue}
        onChange={onChangeHandler}
        placeholder="search products..."
        variant="outlined"
        sx={{
          width: "20rem",
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "inherit",
              borderWidth: 1,
            },
            "&.Mui-focused fieldset": {
              borderColor: "inherit",
              borderWidth: 1,
            },
          },
        }}
      />
    </Box>
  );
}
