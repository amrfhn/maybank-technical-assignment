import { useSelector } from "react-redux";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function SaveSearch() {
  const address = useSelector((state) => state.address);

  return (
    address.length > 0 && (
      <div className="save-search-container">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Recent Search
            </Typography>
            {address.map(
              (index, item) =>
                item && (
                  <div key={index} className="search-text">
                    <Typography variant="body2">{item}</Typography>
                  </div>
                )
            )}
          </CardContent>
        </Card>
      </div>
    )
  );
}
