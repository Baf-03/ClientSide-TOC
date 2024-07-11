import Button from "@mui/material/Button";

export default function Buttons(props) {
  let { value, trigger, colors } = props;
  return (
    <Button variant="outlined" onClick={trigger} color={colors}>
      {value}
    </Button>
  );
}
