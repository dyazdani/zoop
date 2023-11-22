import React from "react";
import ZoopDetails from "./ZoopDetails";
import { Link } from "react-router-dom";
import { ZoopWithDetails } from "../../src/types/custom";
import MoreButton from "./MoreButton";
import { useSelector } from 'react-redux';
import { RootState } from "../app/store";
import Stack from '@mui/material/Stack';

type ZoopListItemProps = {
  zoop: ZoopWithDetails;
};

const ZoopListItem = ({ zoop }: ZoopListItemProps) => {
    const currentUser = useSelector((state: RootState) => state.auth.user);

    return (
    <>
    {/* "currentUser.id === 4" is for testing because currently 
    cannot log into DB users to have access to updating seeded Zoops */}
        {currentUser && currentUser.id === 4 && (
                <Stack direction="row" justifyContent="end">
                <MoreButton 
                    zoopId={zoop.id}
                    authorId={zoop.authorId}
                    receiverId={zoop.receiverId}
                    content={zoop.content}
                />
                </Stack>
            )}
        <Link to={`/zoops/${zoop.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <ZoopDetails zoop={zoop} />
        </Link>
    </>

    )
};

export default ZoopListItem;