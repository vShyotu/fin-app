const AdditionalSection = ({ title, content }) => {
  return (
    <>
      {title && <h2>{title}</h2>}
      {content && <p>{content}</p>}
    </>
  );
};

export const HoldingPage = ({
  icon,
  title,
  content,
  button,
  showAdditionalSection = true,
  additionalSectionTitle,
  additionalSectionContent,
}) => {
  return (
    <div>
      {icon}
      <h1>{title}</h1>
      {content && <p>{content}</p>}
      {button}
      {showAdditionalSection && (
        <AdditionalSection
          title={additionalSectionTitle}
          content={additionalSectionContent}
        />
      )}
    </div>
  );
};
