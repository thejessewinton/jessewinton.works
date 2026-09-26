import { FileUpload } from '~/components/lab/file-upload'
import { Noise } from '~/components/lab/noise'
import { QuantityStepper } from '~/components/lab/quantity-stepper'
import { Switch } from '~/components/lab/switch'

export const LabComponents = [
  {
    title: 'Quantity stepper',
    Component: QuantityStepper,
    Background: Noise,
  },
  {
    title: 'Switch',
    Component: Switch,
    Background: Noise,
  },
  {
    title: 'File upload',
    Component: FileUpload,
    Background: Noise,
  },
]
