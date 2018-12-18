import addedDiff from '../added';
import deletedDiff from '../deleted';
import updatedDiff from '../updated';

const detailedDiff = function (lhs, rhs) {
  var finalDiff = {};
  try {
    finalDiff.added = addedDiff(lhs, rhs);
    finalDiff.deleted = deletedDiff(lhs, rhs);
    finalDiff.updated = updatedDiff(lhs, rhs);
  } catch (errDetailedDiff) {
    finalDiff.error = errDetailedDiff
    console.log(errDetailedDiff);
  } finally {
    return finalDiff;
  }
);

export default detailedDiff;
