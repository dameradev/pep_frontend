import styled from "styled-components";

const Project = styled.div`
  
  border-bottom: 1px solid ${props=> props.theme.blue};
  text-align: left;
  padding: 10px 30px;
  color: #151515;
  
  .project{
      &__title {
        /* text-align: center;
        color: black; */
      }

      &__details {
      display: flex;
      justify-content: space-between;
      div {
        width: 50%;
        text-align: justify;
      } 
    }
  }
`;

const ParticipatingCountires = styled.ul`

`;

const countriesList = (data) => {
  console.log(data);
  return data.map(country => (
    <li>{country}</li>
  ))
}

const SingleProject = (props) => {
  const {title, costs, projectType, description, location, countries, objectives, date} = props.project;
  console.log(props.project)
  return (<Project>
            <h2 className="project__title">{title}</h2>
            
            <div className="project__details">
              <div>
                <h3>Type of project: {projectType.split("_").join(" ")}</h3>
                <ParticipatingCountires>
                  <h3>Participating countires</h3>
                  {countriesList(countries)}  
                </ParticipatingCountires> 
                <p>Location: {location}</p>
                <p>Starting date: {date}</p>
              </div>
              <div>
                <h3>Covered costs by erasmus!</h3>
                {costs}
              </div>
            </div>
        </Project>
  )
}
export default SingleProject;