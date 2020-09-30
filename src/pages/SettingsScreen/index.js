import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { fetchCategories, setSettings } from '../../redux/actions/actionSettings';
import Button from '../../components/button';

class SettingsScreen extends Component {
  componentDidMount() {
    const { fetchCategoriesProps } = this.props;
    fetchCategoriesProps();
  }

  set = (e) => {
    const { name, value } = e.target;
    const { setSettingsProps } = this.props;
    setSettingsProps({ [name]: value });
  }

  renderCategories = () => {
    const { categories } = this.props;
    console.log(categories);
    const options = categories.map((category) => (
      <option value={category.id}>{category.name}</option>
    ));

    return (
      <select name="category" onChange={(e) => this.set(e)}>
        <option value="any">Any</option>
        {options}
      </select>
    );
  }

  renderDifficulty = () => (
    <select name="difficulty" onChange={(e) => this.set(e)}>
      <option value="any">Any</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  );

  renderType = () => (
    <select name="type" onChange={(e) => this.set(e)}>
      <option value="any">Any</option>
      <option value="multiple">Multiple choice</option>
      <option value="boolean">True/False</option>
    </select>
  );

  render() {
    const { isFetching } = this.props;
    if (isFetching) return <div>Loading...</div>;
    return (
      <div className="settings-screen">
        <h1 data-testid="settings-title">SETTINGS</h1>
        <div>
          <span>Choose a category</span>
          {this.renderCategories()}
        </div>
        <div>
          <span>Choose the difficulty</span>
          {this.renderDifficulty()}
        </div>
        <div>
          <span>Choose the type</span>
          {this.renderType()}
        </div>
        <Link to="/">
          <Button type="button">Save and Return</Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.settingsReducer.triviaCategories,
  isFetching: state.settingsReducer.isFetchingCategories,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoriesProps: () => dispatch(fetchCategories()),
  setSettingsProps: (settings) => dispatch(setSettings(settings)),
});

SettingsScreen.propTypes = {
  isFetching: Proptypes.bool.isRequired,
  fetchCategoriesProps: Proptypes.func.isRequired,
  setSettingsProps: Proptypes.func.isRequired,
  categories: Proptypes.objectOf(Proptypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
