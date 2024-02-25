const CourseSection = ({ section }) => {
  return (
    <div className="flex h-min w-full gap-4 bg-gray-200 p-2">
      <input type="checkbox" />
      <span>Section {section.section}</span>
    </div>
  );
};

export default CourseSection;
