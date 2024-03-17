import React from "react";

export interface Param {
  id: number;
  name: string;
  type?: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: props.model.paramValues,
    };
  }

  handleInputChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: prevState.paramValues.map((paramValue) =>
        paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
      ),
    }));
  };

  getModel = (): Model => {
    return {
      ...this.props.model,
      paramValues: this.state.paramValues,
    };
  };

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;
    return (
      <div>
        {params.map((param) => (
          <div key={param.id}>
            <label htmlFor={`param-${param.id}`}>{param.name}:</label>
            <input
              type="text"
              id={`param-${param.id}`}
              value={
                paramValues.find((pv) => pv.paramId === param.id)?.value || ""
              }
              onChange={(e) => this.handleInputChange(param.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ParamEditor;
