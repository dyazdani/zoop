import React, {useState} from "react";
import { ZoopWithDetails } from "../../src/types/custom";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { useAddFaveMutation, useRemoveFaveMutation} from "../features/api";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

type FaveButtonProps = {
  zoop: ZoopWithDetails
};

const FaveButton = ({ zoop }: FaveButtonProps) => {
  const [faved, setFaved] = useState(false);

  const currentUser = useSelector((state: RootState) => state.auth.user)

  const [addFave, {isLoading, data, error}] = useAddFaveMutation();
  const [
    removeFave, 
    {
      isLoading: isRemoveFaveLoading, 
      data: removeFaveData, 
      error: removeFaveError
    }] = useRemoveFaveMutation();



  const handleClick = ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!isLoading && currentUser) {
      if (!faved) {
        addFave({
          faverId: currentUser.id,
          zoopId: zoop.id
        })
        setFaved(true)
      } else {
        const faveId = zoop.faves.filter(
            fave => fave.faverId === currentUser.id
          )[0].id

        removeFave({
          faveId: faveId
        })

        setFaved(false);
      }
    }
  })
  
  return (
      <Button 
        variant="outlined"
        disabled={!currentUser || currentUser.id === zoop.authorId}  
        onClick={handleClick}
      >
        <Stack direction="row" alignItems="center">
          <StarBorderIcon />
          <Typography variant="body2">{zoop.faves.length}</Typography>
        </Stack>
      </Button>
  );
};

export default FaveButton;
