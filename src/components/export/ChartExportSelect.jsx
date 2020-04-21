import React, { useState } from 'react';
import PropTypes from 'proptypes';
import LoaderButton from '@components/common/LoaderButton';
import SelectItem from './SelectItem';
import { getImage, getCsv, getSinglePagePdf } from './BlobFactory';

const ChartExportSelect = ({
  componentName,
  pdfTemplateName,
  exportData,
  filename,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <span
      className="chart-export-select"
      onMouseOver={() => setOpen(true)}
      onFocus={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={() => setOpen(false)}
    >
      <LoaderButton
        label="Export"
        loading={loading}
      />
      { open && (
        <div className="export-dropdown">

          <h3>Export Image</h3>
          <SelectItem
            label="PNG"
            filename={`${filename}.png`}
            getData={() => getImage(componentName)}
            onClick={() => {
              setOpen(false);
              setLoading(true);
            }}
            onComplete={() => setLoading(false)}
          />
          <SelectItem
            label="PDF"
            filename={`${filename}.pdf`}
            getData={() => getSinglePagePdf({
              componentName,
              templateName: pdfTemplateName,
              pdfTitle: filename,
            })}
            onClick={() => {
              setOpen(false);
              setLoading(true);
            }}
            onComplete={() => setLoading(false)}
          />
          {/* <div>Email</div>
          <div>Link</div>
          <div>Excel</div> */}

          <h3>Export Data</h3>
          <SelectItem
            label="CSV"
            filename={`${filename}.csv`}
            getData={() => getCsv(exportData())}
            onClick={() => setOpen(false)}
          />
          {/* <div>Excel</div> */}

        </div>
      )}
    </span>
  );
};

export default ChartExportSelect;

ChartExportSelect.propTypes = {
  componentName: PropTypes.string,
  pdfTemplateName: PropTypes.string,
  exportData: PropTypes.func,
  filename: PropTypes.string,
};

ChartExportSelect.defaultProps = {
  componentName: undefined,
  pdfTemplateName: undefined,
  exportData: () => null,
  filename: undefined,
};
