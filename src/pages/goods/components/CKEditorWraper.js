import React from "react";
//-------------CKEditor
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
//--------------Material
import { Grid,Box } from "@mui/material";
const CKEditorWraper = ({ values }) => {    
  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ mx: 1 }}>
          <CKEditor
            editor={ClassicEditor}
            // data={ckEditorRef.current}
            data={values.values.description}
            onChange={(event, editor) => {
            //   ckEditorRef.current = editor.getData();
              values.setFieldValue("description", editor.getData(), false);
            }}
          />
        </Box>
      </Grid>
    </>
  );
};

export default CKEditorWraper;
