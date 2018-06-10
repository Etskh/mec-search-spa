
export default function ErrorBox(props) {
  return <div className="error box">
    <p>
      {props.children}
    </p>
  </div>
};
