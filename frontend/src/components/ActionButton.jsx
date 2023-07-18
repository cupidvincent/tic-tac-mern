import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

export default function ActionButton({action, to, classNames, label, variant}) {
  return (
    <Button
        onClick={action}
        className={classNames}
        variant={variant}
    >
      {label}
    </Button>
  )
}
