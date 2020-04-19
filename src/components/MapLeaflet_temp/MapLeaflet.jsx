import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const dataset_list = [
  { name: 'roads', yaml: { title: 'Roads in general' }, geojson: {} },

  {
    name: 'car_datasets/small_cars',
    yaml: { title: 'Set of small cars' },
    geojson: {},
  },

  { name: 'example_dataset', yaml: { title: 'Example dataset' }, geojson: {} },
];

const map_list = [
  {
    name: 'dark-matter',
    title: 'Dark Matter',
    endpoint: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },

  {
    name: 'klokantech-basic',
    title: 'Basic',
    endpoint: 'http://localhost:8080/styles/klokantech-basic/{z}/{x}/{y}.png',
  },

  {
    name: 'osm-bright',
    title: 'Bright',
    endpoint: 'http://localhost:8080/styles/osm-bright/{z}/{x}/{y}.png',
  },
];

const model_list = [
  {
    name: 'example_models/simple_regression',
    type: 'sklearn',
    module_path: 'example_models/simple_regression.py',
  },

  {
    name: 'example_models/simple_detection',
    type: 'sklearn',
    module_path: 'example_models/simple_detection.py',
  },

  {
    name: 'example_models/simple_segmentation',
    type: 'sklearn',
    module_path: 'example_models/simple_segmentation.py',
  },

  {
    name: 'models_maxmmsu/simple_classification',
    type: 'sklearn',
    module_path: 'example_models/simple_classification.py',
  },
];

const predictor_list = [
  {
    name: 'example_models/regression_2020-01-17',
    model: 'example_models/simple_regression',
    regressor_pickle: 'example_models/regression_2020-01-17.pklz',
    trained_process_data: {},
    quality_check_data: {},
  },
];

const Map = () => {
  return (
    <div>
      <Tabs>
        <div label="Datasets">
          <Datasets />
        </div>
        <div label="Maps">
          <Maps />
        </div>
        <div label="Models">
          <Models />
        </div>
        <div label="Predictors">
          <Predictors />
        </div>
      </Tabs>
    </div>
  );
};

class Datasets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
      showValues: {},
      workshop: '',
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/dataset_list')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ workshop: data });
      })
      .catch(console.log);
  }

  handleSelectElement(e) {
    this.setState({
      message_text:
        e.target.getAttribute('yaml') + '\n' + e.target.getAttribute('geojson'),
    });
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <td>
              <select id="brow" size="20" className="rebels-selection-list">
                {dataset_list.map((dataset) => (
                  <option
                    yaml={JSON.stringify(dataset.yaml)}
                    geojson={JSON.stringify(dataset.geojson)}
                    onClick={this.handleSelectElement.bind(this)}
                  >
                    {dataset.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <textarea cols="40" rows="15" value={this.state.message_text} />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

class Maps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
      showValues: {},
      workshop: '',
    };
  }
  handleSelectElement(e) {
    this.setState({
      message_text:
        e.target.getAttribute('map_title') +
        '\n' +
        e.target.getAttribute('map_endpoint'),
    });
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <td>
              <select id="brow" size="20" className="rebels-selection-list">
                {map_list.map((map) => (
                  <option
                    map_title={map.title}
                    map_endpoint={map.endpoint}
                    onClick={this.handleSelectElement.bind(this)}
                  >
                    {map.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <textarea cols="40" rows="15" value={this.state.message_text} />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

class Models extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
      showValues: {},
      workshop: '',
    };
  }
  handleSelectElement(e) {
    this.setState({
      message_text:
        ReactDOM.findDOMNode(e.target).getAttribute('module_path') +
        '\n' +
        ReactDOM.findDOMNode(e.target).getAttribute('model_type'),
    });
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <td>
              <select id="brow" size="20" className="rebels-selection-list">
                {model_list.map((model) => (
                  <option
                    model_type={model.type}
                    module_path={model.module_path}
                    onClick={this.handleSelectElement.bind(this)}
                  >
                    {model.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <textarea cols="40" rows="15" value={this.state.message_text} />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

class Predictors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
      showValues: {},
      workshop: '',
    };
  }
  handleSelectElement(e) {
    this.setState({
      message_text: ReactDOM.findDOMNode(e.target).getAttribute(
        'predictor_model'
      ),
    });
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <td>
              <select id="brow" size="20" className="rebels-selection-list">
                {predictor_list.map((predictor) => (
                  <option
                    predictor_model={predictor.model}
                    onClick={this.handleSelectElement.bind(this)}
                  >
                    {predictor.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <textarea cols="40" rows="15" value={this.state.message_text} />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

class Tab extends React.Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label },
    } = this;

    let className = 'tab-list-item';

    if (activeTab === label) {
      className += ' tab-list-active';
    }

    return (
      <li className={className} onClick={onClick}>
        {label}
      </li>
    );
  }
}

class Tabs extends React.Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab },
    } = this;

    return (
      <div className="tabs">
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
        <ol className="tab-list">
          {children.map((child) => {
            const { label } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ol>
      </div>
    );
  }
}

export default Map;
