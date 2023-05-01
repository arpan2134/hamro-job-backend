import React from "react";

import Link from "next/link";
import DataTable from "react-data-table-component";



const JobCandidates = ({ candidatesApplied }) => {

  // declare the variables hasmounted and setHasMounted to make
const [hasMounted, setHasMounted] = React.useState(false);

    //If react doesn't mount yet then it will return nothing.
    React.useEffect(() => {
        setHasMounted(true);
    }, []);

    if(!hasMounted) {
        return null;
    }

  const columns = [
    {
      name: "Job Name",
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: "User ID",
      sortable: true,
      selector: (row) => row.id,
    },
    {
      name: "Candidate Resume",
      sortable: true,
      selector: (row) => row.resume,
    },
    {
      name: "Applied At",
      sortable: true,
      selector: (row) => row.appliedAt,
    },
  ];

  const data = [];

  candidatesApplied &&
    candidatesApplied.forEach((item) => {
      data.push({
        title: item.job.title,
        id: item.user,
        salary: item.salary, 
        resume: (
            <Link legacyBehavior
                    href={`https://hamrojob.s3.amazonaws.com/${item.resume}`}
                  >
                    <a
                      className="text-success text-center ml-4"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <b>
                        <i aria-hidden className="fas fa-download"></i> View Resume
                      </b>
                    </a>
                  </Link> 
        ),
        appliedAt: item.appliedAt.substring(0, 10),
      });
    });

  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-8 mt-5">
        <h4 className="my-5">
          {candidatesApplied &&
            `${candidatesApplied.length} Candidates applied to this job`}
        </h4>
        <DataTable columns={columns} data={data} pagination responsive />
      </div>
      <div className="col-2"></div>
    </div>
  );
};

export default JobCandidates;