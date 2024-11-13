import { useState } from 'react';
import { createJob, createJobMutation, jobByIdQuery } from '../lib/graphql/queries';
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client';

function CreateJobPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // apolloClient useMutation Hook
  const [mutate, { loading }] = useMutation(createJobMutation)

  const handleSubmit = async (event) => {
    event.preventDefault();
    // { data: { job } }  this is like extracting data like data.job while getting the result/response
    const { data: { job } } = await mutate({
      variables: { input: { title, description } },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: jobByIdQuery,
          variables: { id: data.job.id },
          data,
        })
      }
    })


    if (job.id) {
      navigate(`/jobs/${job.id}`)
    }
    console.log('should post a new job:', job);
  };

  //With react hooks
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const job = await createJob({ title, description })
  //   if (job.id) {
  //     navigate(`/jobs/${job.id}`)
  //   }
  //   console.log('should post a new job:', job);
  // };

  return (
    <div>
      <h1 className="title">
        New Job
      </h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control">
              <input className="input" type="text" value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Description
            </label>
            <div className="control">
              <textarea className="textarea" rows={10} value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
