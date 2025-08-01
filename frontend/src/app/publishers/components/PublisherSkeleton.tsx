import React from 'react';
import { Card, Placeholder, Stack } from 'react-bootstrap';

export default function PublisherSkeleton() {
  return (
    <Stack gap={3}>
      {[...Array<undefined>(4)].map((_, idx) => (
        <Card key={idx} className="shadow-sm">
          <Card.Body>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
              <div className="mb-3 mb-md-0">
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={6} style={{ height: '20px' }} />
                </Placeholder>
                <Placeholder
                  as={Card.Subtitle}
                  animation="glow"
                  className="mt-2"
                >
                  <Placeholder xs={4} style={{ height: '12px' }} />
                </Placeholder>
              </div>

              <Stack direction="horizontal" gap={2}>
                <Placeholder.Button variant="primary" xs={4} animation="glow" />
                <Placeholder.Button variant="danger" xs={3} animation="glow" />
              </Stack>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Stack>
  );
}
