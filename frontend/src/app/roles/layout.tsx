export default function RolesLayout(props: {
    children: React.ReactNode;
    modal: React.ReactNode;
  }) {
    return (
      <>

          {props.children}
          {props.modal}

      </>
    );
  }