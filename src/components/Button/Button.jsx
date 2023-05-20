import PropTypes from "prop-types";
import { ButtonLm } from "./styled";

/* При натисканні на кнопку Load more повинна довантажуватись
наступна порція зображень і рендеритися разом із попередніми.
 Кнопка повинна рендеритися лише тоді, коли є якісь завантажені
 зображення. Якщо масив зображень порожній, кнопка не рендериться.
 */

export const Button = ({ loadMore }) => (
  <ButtonLm type='button' onClick={loadMore}>
    Load more
  </ButtonLm>
)

Button.propTypes = {
  loadMore: PropTypes.func.isRequired
}
