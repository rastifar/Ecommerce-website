import React from 'react';

const SaveBtn = ({editMode}) => {
    return (
        <Button
            variant="outlined"
            color="primary"
            disabled={editMode ? false : true}
            onClick={handleSendEdit}
          >
            ذخیره
          </Button>
    );
};

export default SaveBtn;